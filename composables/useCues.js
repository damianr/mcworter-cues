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
      id: "venetian",
      title: "The Venetian",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "victorian-crown",
      title: "The Victorian Crown",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "deco",
      title: "The Deco",
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
    {
      id: "regal",
      title: "The Regal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "points-interrupted",
      title: "The Points Interrupted",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "six-points",
      title: "The Six Point Player",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "ivory-crown",
      title: "The Ivory Crown",
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
      id: 2334,
      designId: "florentine",
      images: {
        details: {
          1: "images/2334/details/1.png",
          2: "images/2334/details/2.png",
        },
        list: {
          1: "images/2334/list/1.png",
          2: "images/2334/list/2.png",
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
      id: 2333,
      designId: "royal",
      images: {
        details: {
          1: "images/2333/details/1.png",
          2: "images/2333/details/2.png",
        },
        list: {
          1: "images/2333/list/1.png",
          2: "images/2333/list/2.png",
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
    {
      id: 2337,
      designId: "venetian",
      images: {
        details: {
          1: "images/2337/details/1.png",
          2: "images/2337/details/2.png",
        },
        list: {
          1: "images/2337/list/1.png",
          2: "images/2337/list/2.png",
        },
      },
    },
    {
      id: 2323,
      designId: "venetian",
      images: {
        details: {
          1: "images/2323/details/1.png",
          2: "images/2323/details/2.png",
        },
        list: {
          1: "images/2323/list/1.png",
          2: "images/2323/list/2.png",
        },
      },
    },
    {
      id: 2290,
      designId: "venetian",
      images: {
        details: {
          1: "images/2290/details/1.png",
          2: "images/2290/details/2.png",
        },
        list: {
          1: "images/2290/list/1.png",
          2: "images/2290/list/2.png",
        },
      },
    },
    {
      id: 2332,
      designId: "deco",
      images: {
        details: {
          1: "images/2332/details/1.png",
          2: "images/2332/details/2.png",
        },
        list: {
          1: "images/2332/list/1.png",
          2: "images/2332/list/2.png",
        },
      },
    },
    {
      id: 2287,
      designId: "deco",
      images: {
        details: {
          1: "images/2287/details/1.png",
          2: "images/2287/details/2.png",
        },
        list: {
          1: "images/2287/list/1.png",
          2: "images/2287/list/2.png",
        },
      },
    },
    {
      id: 2336,
      designId: "regal",
      images: {
        details: {
          1: "images/2336/details/1.png",
          2: "images/2336/details/2.png",
        },
        list: {
          1: "images/2336/list/1.png",
          2: "images/2336/list/2.png",
        },
      },
    },
    {
      id: 2329,
      designId: "points-interrupted",
      images: {
        details: {
          1: "images/2329/details/1.png",
          2: "images/2329/details/2.png",
        },
        list: {
          1: "images/2329/list/1.png",
          2: "images/2329/list/2.png",
        },
      },
    },
    {
      id: 2302,
      designId: "points-interrupted",
      images: {
        details: {
          1: "images/2302/details/1.png",
          2: "images/2302/details/2.png",
        },
        list: {
          1: "images/2302/list/1.png",
          2: "images/2302/list/2.png",
        },
      },
    },
    {
      id: 2318,
      designId: "victorian-crown",
      images: {
        details: {
          1: "images/2318/details/1.png",
          2: "images/2318/details/2.png",
        },
        list: {
          1: "images/2318/list/1.png",
          2: "images/2318/list/2.png",
        },
      },
    },
    {
      id: 2341,
      designId: "victorian-crown",
      images: {
        details: {
          1: "images/2341/details/1.png",
          2: "images/2341/details/2.png",
        },
        list: {
          1: "images/2341/list/1.png",
          2: "images/2341/list/2.png",
        },
      },
    },
    {
      id: 2291,
      designId: "silver-smoke",
      images: {
        details: {
          1: "images/2291/details/1.png",
          2: "images/2291/details/2.png",
        },
        list: {
          1: "images/2291/list/1.png",
          2: "images/2291/list/2.png",
        },
      },
    },
    {
      id: 2293,
      designId: "six-points",
      images: {
        details: {
          1: "images/2293/details/1.png",
          2: "images/2293/details/2.png",
        },
        list: {
          1: "images/2293/list/1.png",
          2: "images/2293/list/2.png",
        },
      },
    },
    {
      id: 2340,
      designId: "ivory-crown",
      images: {
        details: {
          1: "images/2340/details/1.png",
          2: "images/2340/details/2.png",
        },
        list: {
          1: "images/2340/list/1.png",
          2: "images/2340/list/2.png",
        },
      },
    },
  ]);

  // Past cues are older cues with single images
  const pastCues = ref([
    {
      image: "images/past-cues/1163.jpg",
      designId: "ivory-crown", // To be filled in
    },
    {
      image: "images/past-cues/1167.jpg",
      designId: "razor", // To be filled in
    },
    {
      image: "images/past-cues/1169.jpg",
      designId: "ten-point-crown", // To be filled in
    },
    {
      image: "images/past-cues/1174.jpg",
      designId: "ivory-crown", // To be filled in
    },
    {
      image: "images/past-cues/1246.jpg",
      designId: "feather-crown", // To be filled in
    },
    {
      image: "images/past-cues/1250.jpg",
      designId: "details", // To be filled in
    },
    {
      image: "images/past-cues/1252.jpg",
      designId: "ivory-crown", // To be filled in
    },
    {
      image: "images/past-cues/1281.jpg",
      designId: "squares", // To be filled in
    },
    {
      image: "images/past-cues/1287.jpg",
      designId: "ptolemy", // To be filled in
    },
    {
      image: "images/past-cues/1290.jpg",
      designId: "victorian", // To be filled in
    },
    {
      image: "images/past-cues/1444.jpg",
      designId: "victorian", // To be filled in
    },
    {
      image: "images/past-cues/1449.jpg",
      designId: "pinnacle", // To be filled in
    },
    {
      image: "images/past-cues/1453.jpg",
      designId: "carnaval", // To be filled in
    },
    {
      image: "images/past-cues/1463.jpg",
      designId: "feather-crown", // To be filled in
    },
    {
      image: "images/past-cues/1481.jpg",
      designId: "ptolemy", // To be filled in
    },
    {
      image: "images/past-cues/1485.jpg",
      designId: "ten-point-crown", // To be filled in
    },
    {
      image: "images/past-cues/1516.jpg",
      designId: "spaniard", // To be filled in
    },
    {
      image: "images/past-cues/1523.jpg",
      designId: "deco", // To be filled in
    },
    {
      image: "images/past-cues/1541.jpg",
      designId: "deco", // To be filled in
    },
    {
      image: "images/past-cues/1543.jpg",
      designId: "regal", // To be filled in
    },
    {
      image: "images/past-cues/1605.jpg",
      designId: "venetian", // To be filled in
    },
    {
      image: "images/past-cues/1608.jpg",
      designId: "points-interrupted", // To be filled in
    },
    {
      image: "images/past-cues/1625.jpg",
      designId: "west-palm", // To be filled in
    },
    {
      image: "images/past-cues/1716.jpeg",
      designId: "origami", // To be filled in
    },
    {
      image: "images/past-cues/1772.jpg",
      designId: "six-points", // To be filled in
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

  // Get all past cues
  const getAllPastCues = () => pastCues.value;

  // Get past cues for a specific design
  const getPastCuesByDesignId = (designId) => {
    return pastCues.value.filter((cue) => cue.designId === designId);
  };

  return {
    designs: readonly(designs),
    cues: readonly(cues),
    pastCues: readonly(pastCues),
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
  };
}
