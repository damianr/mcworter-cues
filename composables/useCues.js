export default function useCues() {
  const nuxtApp = useNuxtApp();

  // Reactive state for data from Supabase
  const designs = ref([]);
  const cues = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const initialized = ref(false);

  // Fetch data from Supabase
  const fetchData = async () => {
    if (initialized.value) return;

    const $supabase = nuxtApp.$supabase;

    // Handle SSR - Supabase client only available on client
    if (!$supabase) {
      if (import.meta.server) {
        loading.value = true;
        return;
      }
      console.error("Supabase client not initialized");
      error.value = "Supabase client not available";
      loading.value = false;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      // Fetch designs
      const { data: designsData, error: designsError } = await $supabase
        .from("designs")
        .select("*")
        .order("title");

      if (designsError) throw designsError;

      // Fetch cues
      const { data: cuesData, error: cuesError } = await $supabase
        .from("cues")
        .select("*")
        .order("id", { ascending: false });

      if (cuesError) throw cuesError;

      designs.value = designsData || [];
      cues.value = cuesData || [];
      initialized.value = true;
    } catch (e) {
      console.error("Error fetching data from Supabase:", e);
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  // Only fetch on client side
  if (import.meta.client) {
    fetchData();
  }

  // Get all designs
  const getAllDesigns = () => designs.value;

  // Get a single design by ID
  const getDesignById = (id) => {
    return designs.value.find((design) => design.id === id);
  };

  // Get all cues (excluding past cues)
  const getAllCues = () => cues.value.filter((cue) => !cue.is_past_cue);

  // Get a single cue by ID
  const getCueById = (id) => {
    return cues.value.find((cue) => cue.id === parseInt(id));
  };

  // Get cue with its design information
  const getCueWithDesign = (id) => {
    const cue = getCueById(id);
    if (!cue) return null;

    const design = getDesignById(cue.design_id);
    return {
      ...cue,
      designId: cue.design_id,
      title: design?.title,
      description: design?.description,
    };
  };

  // Get all cues for a specific design (excluding past cues)
  const getCuesByDesignId = (designId) => {
    return cues.value.filter((cue) => cue.design_id === designId && !cue.is_past_cue);
  };

  // Sort cues: highlighted first, then by ID descending
  const sortCues = (cuesArray) => {
    return [...cuesArray].sort((a, b) => {
      const aHighlight = a.highlight ? 1 : 0;
      const bHighlight = b.highlight ? 1 : 0;
      if (aHighlight !== bHighlight) {
        return bHighlight - aHighlight;
      }
      return b.id - a.id;
    });
  };

  // Get designs by array of design IDs
  const getDesignsByIds = (ids) => {
    return ids.map((id) => designs.value.find((design) => design.id === id)).filter(Boolean);
  };

  // Get the latest cue for each design by design IDs
  const getLatestCuesByDesignIds = (designIds) => {
    return designIds
      .map((designId) => {
        const design = getDesignById(designId);
        if (!design) return null;

        const designCues = getCuesByDesignId(designId);
        if (designCues.length === 0) return null;

        const latestCue = designCues.reduce(
          (max, cue) => (cue.id > max.id ? cue : max),
          designCues[0]
        );

        return {
          ...latestCue,
          designId: latestCue.design_id,
          title: design.title,
          description: design.description,
        };
      })
      .filter(Boolean);
  };

  // Get all cues for each design by design IDs (with design info)
  const getDesignsWithAllCues = (designIds) => {
    return designIds
      .map((designId) => {
        const design = getDesignById(designId);
        if (!design) return null;

        const designCues = getCuesByDesignId(designId);
        if (designCues.length === 0) return null;

        const sortedCues = sortCues(designCues);

        // Map cues to include designId for backwards compatibility
        const mappedCues = sortedCues.map((cue) => ({
          ...cue,
          designId: cue.design_id,
        }));

        return {
          designId: design.id,
          title: design.title,
          description: design.description,
          cues: mappedCues,
        };
      })
      .filter(Boolean);
  };

  // Get all past cues (with backwards compatible 'image' property)
  const getAllPastCues = () => {
    return cues.value
      .filter((cue) => cue.is_past_cue)
      .map((cue) => ({
        ...cue,
        designId: cue.design_id,
        // Map images.main to image for backwards compatibility
        image: cue.images?.main || null,
      }));
  };

  // Get past cues for a specific design
  const getPastCuesByDesignId = (designId) => {
    return cues.value
      .filter((cue) => cue.design_id === designId && cue.is_past_cue)
      .map((cue) => ({
        ...cue,
        designId: cue.design_id,
        image: cue.images?.main || null,
      }));
  };

  // Helper to get image URL from cue images object
  const getImageUrl = (cue, type, index = 0) => {
    if (!cue?.images) return null;

    if (type === "main") {
      return cue.images.main || null;
    }

    const imageArray = cue.images[type];
    if (!imageArray || !Array.isArray(imageArray)) return null;

    return imageArray[index] || null;
  };

  // Transform Supabase storage URL to use image transformation endpoint
  // This resizes images on-the-fly for faster loading
  const getOptimizedImageUrl = (url, options = {}) => {
    if (!url) return "";

    // Only transform Supabase storage URLs
    if (!url.includes("supabase.co/storage/v1/object/public/")) {
      return url;
    }

    const { width = 1200, quality = 80 } = options;

    // Convert from /object/public/ to /render/image/public/
    const transformedUrl = url.replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/"
    );

    // Add transformation parameters
    // resize=contain ensures proportional scaling without cropping
    return `${transformedUrl}?width=${width}&quality=${quality}&resize=contain`;
  };

  // Refresh data from Supabase
  const refresh = () => {
    initialized.value = false;
    return fetchData();
  };

  // Publish a cue (set published = true)
  const publishCue = async (cueId) => {
    const $supabase = nuxtApp.$supabase;
    if (!$supabase) throw new Error("Supabase not initialized");

    const { error: updateError } = await $supabase
      .from("cues")
      .update({ published: true })
      .eq("id", cueId);

    if (updateError) throw updateError;

    // Update local state
    const cueIndex = cues.value.findIndex((c) => c.id === cueId);
    if (cueIndex !== -1) {
      cues.value[cueIndex].published = true;
    }

    return true;
  };

  // Unpublish a cue (set published = false)
  const unpublishCue = async (cueId) => {
    const $supabase = nuxtApp.$supabase;
    if (!$supabase) throw new Error("Supabase not initialized");

    const { error: updateError } = await $supabase
      .from("cues")
      .update({ published: false })
      .eq("id", cueId);

    if (updateError) throw updateError;

    // Update local state
    const cueIndex = cues.value.findIndex((c) => c.id === cueId);
    if (cueIndex !== -1) {
      cues.value[cueIndex].published = false;
    }

    return true;
  };

  return {
    designs,
    cues,
    loading,
    error,
    getAllDesigns,
    getDesignById,
    getAllCues,
    getCueById,
    getCueWithDesign,
    getCuesByDesignId,
    getDesignsByIds,
    getLatestCuesByDesignIds,
    getDesignsWithAllCues,
    getAllPastCues,
    getPastCuesByDesignId,
    getImageUrl,
    getOptimizedImageUrl,
    sortCues,
    refresh,
    publishCue,
    unpublishCue,
  };
}
