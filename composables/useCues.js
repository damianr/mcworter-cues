export default function useCues() {
  // Designs are the high-level entities with title and description
  const designs = ref([
    {
      id: "anniversary",
      title: "The 20th Anniversary",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "florentine",
      title: "The Florentine",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "royal",
      title: "The Royal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "silver-smoke",
      title: "The Silver Smoke",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "engrave",
      title: "The Engrave",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  // Cues are individual versions/iterations of a design
  const cues = ref([
    {
      id: 202,
      designId: "anniversary",
      images: {
        details: {
          1: "images/202/details/1.png",
          2: "images/202/details/2.png",
        },
        list: {
          1: "images/202/list/1.png",
          2: "images/202/list/2.png",
        },
      },
    },
    {
      id: 2335,
      designId: "florentine",
      images: {
        details: {
          1: "images/2335/details/1.png",
          2: "images/2335/details/2.png",
        },
        list: {
          1: "images/2335/list/1.png",
          2: "images/2335/list/2.png",
        },
      },
    },
    {
      id: 2311,
      designId: "royal",
      images: {
        details: {
          1: "images/2311/details/1.png",
          2: "images/2311/details/2.png",
        },
        list: {
          1: "images/2311/list/1.png",
          2: "images/2311/list/2.png",
        },
      },
    },
    {
      id: 333,
      designId: "royal",
      images: {
        details: {
          1: "images/3333/details/1.png",
          2: "images/3333/details/2.png",
        },
        list: {
          1: "images/3333/list/1.png",
          2: "images/3333/list/2.png",
        },
      },
    },
    {
      id: 2312,
      designId: "silver-smoke",
      images: {
        details: {
          1: "images/2312/details/1.png",
          2: "images/2312/details/2.png",
        },
        list: {
          1: "images/2312/list/1.png",
          2: "images/2312/list/2.png",
        },
      },
    },
    {
      id: 2322,
      designId: "engrave",
      images: {
        details: {
          1: "images/2322/details/1.png",
          2: "images/2322/details/2.png",
        },
        list: {
          1: "images/2322/list/1.png",
          2: "images/2322/list/2.png",
        },
      },
    },
  ]);

  // Get all designs
  const getAllDesigns = () => designs.value;

  // Get a single design by ID
  const getDesignById = (id) => {
    return designs.value.find((design) => design.id === id);
  };

  // Get all cues
  const getAllCues = () => cues.value;

  // Get a single cue by ID
  const getCueById = (id) => {
    return cues.value.find((cue) => cue.id === parseInt(id));
  };

  // Get cue with its design information
  const getCueWithDesign = (id) => {
    const cue = getCueById(id);
    if (!cue) return null;

    const design = getDesignById(cue.designId);
    return {
      ...cue,
      title: design?.title,
      description: design?.description,
    };
  };

  // Get all cues for a specific design
  const getCuesByDesignId = (designId) => {
    return cues.value.filter((cue) => cue.designId === designId);
  };

  // Get designs by array of design IDs
  const getDesignsByIds = (ids) => {
    return ids.map((id) => designs.value.find((design) => design.id === id)).filter(Boolean);
  };

  // Get the latest (or first) cue for each design by design IDs
  const getLatestCuesByDesignIds = (designIds) => {
    return designIds
      .map((designId) => {
        const design = getDesignById(designId);
        if (!design) return null;

        const designCues = getCuesByDesignId(designId);
        if (designCues.length === 0) return null;

        // Get the cue with the largest ID
        const latestCue = designCues.reduce(
          (max, cue) => (cue.id > max.id ? cue : max),
          designCues[0]
        );

        return {
          ...latestCue,
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

        // Sort cues by ID in descending order (largest ID first)
        const sortedCues = [...designCues].sort((a, b) => b.id - a.id);

        return {
          designId: design.id,
          title: design.title,
          description: design.description,
          cues: sortedCues,
        };
      })
      .filter(Boolean);
  };

  return {
    designs: readonly(designs),
    cues: readonly(cues),
    getAllDesigns,
    getDesignById,
    getAllCues,
    getCueById,
    getCueWithDesign,
    getCuesByDesignId,
    getDesignsByIds,
    getLatestCuesByDesignIds,
    getDesignsWithAllCues,
  };
}
