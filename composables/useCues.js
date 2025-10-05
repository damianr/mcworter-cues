export default function useCues() {
  const cues = ref([
    {
      id: 202,
      title: "20th Anniversary",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "one",
      images: {
        1: "/images/202/1.png",
        2: "/images/202/2.png",
        3: "/images/202/3.png",
      },
    },
    {
      id: 2335,
      title: "Florentine",
      description:
        "The Player Six Pointer is a unique cue that is a hybrid of the Player Six and the Player Eight. It is a great cue for players who are looking to improve their game.",
      section: "one",
      images: {
        1: "/images/2335/1.png",
        2: "/images/2335/2.png",
        3: "/images/2335/3.png",
      },
    },
    {
      id: 2311,
      title: "Royal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "one",
      images: {
        1: "/images/2311/1.png",
        2: "/images/2311/2.png",
        3: "/images/2311/3.png",
      },
    },

    {
      id: 2312,
      title: "Black smoke",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "two",
      images: {
        1: "/images/2312/1.png",
        2: "/images/2312/2.png",
        3: "/images/2312/3.png",
      },
    },
    {
      id: 2322,
      title: "Regal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      section: "two",
      images: {
        1: "/images/2322/1.png",
        2: "/images/2322/2.png",
        3: "/images/2322/3.png",
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

  return {
    cues: readonly(cues),
    getAllCues,
    getCueById,
    getCuesBySection,
  };
}
