import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/api.js";
import FilterBar from "../components/FilterBar.jsx";
import DataTable from "../components/DataTable.jsx";
import Loading from "../components/Loading.jsx";

const formatCurrency = (value) => {
  const num = parseFloat(value) || 0;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(num);
};

const formatNumber = (value) => {
  const num = parseFloat(value) || 0;
  return new Intl.NumberFormat("fr-FR").format(num);
};

const formatROAS = (value) => {
  const num = parseFloat(value) || 0;
  return num.toFixed(2);
};

function CreasTable() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({
    produit: [],
    createur: [],
    type: [],
    mois: [],
    statut: [],
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const allData = await getData(filters);
      setData(allData);

      // Extraire les options uniques pour les filtres
      const produits = [
        ...new Set(allData.map((item) => item.Produit).filter(Boolean)),
      ].sort();
      const createurs = [
        ...new Set(allData.map((item) => item.Créateur).filter(Boolean)),
      ].sort();
      const types = [
        ...new Set(
          allData.map((item) => item["Type de contenu"]).filter(Boolean)
        ),
      ].sort();
      const mois = [
        ...new Set(allData.map((item) => item.Mois).filter(Boolean)),
      ].sort();
      const statuts = [
        ...new Set(allData.map((item) => item.Statut).filter(Boolean)),
      ].sort();

      setOptions({
        produit: produits,
        createur: createurs,
        type: types,
        mois,
        statut: statuts,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (row) => {
    const creaName = row["Nom de l'annonce"];
    if (creaName) {
      navigate(`/crea/${encodeURIComponent(creaName)}`);
    }
  };

  const columns = [
    {
      key: "Nom de l'annonce",
      label: "Nom de l'annonce",
      sortable: true,
    },
    {
      key: "Produit",
      label: "Produit",
      sortable: true,
    },
    {
      key: "Créateur",
      label: "Créateur",
      sortable: true,
    },
    {
      key: "Type de contenu",
      label: "Type",
      sortable: true,
    },
    {
      key: "Mois",
      label: "Mois",
      sortable: true,
    },
    {
      key: "Statut",
      label: "Statut",
      sortable: true,
      render: (value) => {
        const badgeClass =
          {
            "En ligne": "badge-success",
            Arrêtée: "badge-danger",
            "En pause": "badge-warning",
            Archivée: "badge-neutral",
          }[value] || "badge-neutral";
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      },
    },
    {
      key: "Budget dépensé (€)",
      label: "Budget (€)",
      sortable: true,
      render: (value) => formatCurrency(value),
    },
    {
      key: "Conversions (achats)",
      label: "Conversions",
      sortable: true,
      render: (value) => formatNumber(value),
    },
    {
      key: "ROAS",
      label: "ROAS",
      sortable: true,
      render: (value) => formatROAS(value),
    },
    {
      key: "Coût par conversion (€)",
      label: "Coût par conversion (€)",
      sortable: true,
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tableau des créas</h1>
        <p className="page-subtitle">
          Explorez et analysez toutes vos créations publicitaires
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        options={{
          produit: options.produit,
          createur: options.createur,
          type: options.type,
          mois: options.mois,
          statut: options.statut,
          search: true,
        }}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="mb-4 text-sm text-gray-600">
          {data.length} créa{data.length > 1 ? "s" : ""} trouvée
          {data.length > 1 ? "s" : ""}
        </div>
      )}

      <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
}

export default CreasTable;
