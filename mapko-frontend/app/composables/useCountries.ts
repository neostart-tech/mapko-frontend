import { ref } from "vue";

export const useCountries = () => {
  const countries = ref<string[]>([]);
  const loading = ref(false);

  const fetchCountries = async () => {
    loading.value = true;
    try {
      // On utilise l'API RestCountries pour récupérer tous les pays
      // On demande spécifiquement les noms (name) et les traductions (translations)
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,translations",
      );
      const data = await response.json();

      // On extrait le nom français s'il existe, sinon le nom commun
      const names = data.map((country: any) => {
        return country.translations.fra?.common || country.name.common;
      });

      // On trie par ordre alphabétique et on enlève les doublons potentiels
      countries.value = [...new Set(names)].sort((a: any, b: any) =>
        a.localeCompare(b),
      );
    } catch (error) {
      console.error("Erreur lors du chargement des pays:", error);
      // Fallback au cas où l'API échoue
      countries.value = [
        "Togo",
        "Bénin",
        "Côte d'Ivoire",
        "Sénégal",
        "Burkina Faso",
        "Mali",
        "Guinée",
        "Niger",
        "Ghana",
        "Nigeria",
      ].sort();
    } finally {
      loading.value = false;
    }
  };

  return {
    countries,
    loading,
    fetchCountries,
  };
};
