export default function useCues() {
  const cues = ref([
    {
      id: 202,
      title: "The 20th Anniversary",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "one",
      images: {
        1: "/images/202/1.png",
        2: "/images/202/2.png",
        3: "/images/202/3.png",
        4: "/images/202/4.png",
      },
    },
    {
      id: 2335,
      title: "The Florentine",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "one",
      images: {
        1: "/images/2335/1.png",
        2: "/images/2335/2.png",
        3: "/images/2335/3.png",
        4: "/images/2335/4.png",
      },
    },
    {
      id: 2311,
      title: "The Royal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "one",
      images: {
        1: "/images/2311/1.png",
        2: "/images/2311/2.png",
        3: "/images/2311/3.png",
        4: "/images/2311/4.png",
      },
    },

    {
      id: 2312,
      title: "The Silver smoke",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "two",
      images: {
        1: "/images/2312/1.png",
        2: "/images/2312/2.png",
        3: "/images/2312/3.png",
        4: "/images/2312/4.png",
      },
    },
    {
      id: 2322,
      title: "The Engrave",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "two",
      images: {
        1: "/images/2322/1.png",
        2: "/images/2322/2.png",
        3: "/images/2322/3.png",
        4: "/images/2322/4.png",
      },
    },
  ]);

  // Get all cues
  const getAllCues = () => cues.value;

  // Get a single cue by ID
  const getCueById = (id) => {
    return cues.value.find((cue) => cue.id === parseInt(id));
  };

  // Get cues by section
  const getCuesBySection = (section) => {
    return cues.value.filter((cue) => cue.section === section);
  };

  // Get cues by array of IDs
  const getCuesByIds = (ids) => {
    return ids.map((id) => cues.value.find((cue) => cue.id === id)).filter(Boolean);
  };

  return {
    cues: readonly(cues),
    getAllCues,
    getCueById,
    getCuesBySection,
    getCuesByIds,
  };
}
