export default function useCues() {
  const cues = ref([
    {
      id: 1758,
      title: "Six pointer",
      description:
        "The Player Six Pointer is a unique cue that is a hybrid of the Player Six and the Player Eight. It is a great cue for players who are looking to improve their game.",
      section: "one",
      images: {
        1: "/images/1758/1.png",
        2: "/images/1758/2.png",
        3: "/images/1758/3.png",
      },
    },
    {
      id: 2392,
      title: "The Pinnacle",
      description:
        "The Pinnacle design was named because at the time of its introduction over 6 years ago, this was Jerry's best piece. The cue is distinguished by its hourglass - shaped points and dominating use of the theme wood of Amboyna.",
      section: "one",
      images: {
        1: "/images/2392/1.png",
        2: "/images/2392/2.png",
        3: "/images/2392/3.png",
      },
    },
    {
      id: 1983,
      title: "20th Anniversary",
      description:
        "The Pinnacle design was named because at the time of its introduction over 6 years ago, this was Jerry's best piece. The cue is distinguished by its hourglass - shaped points and dominating use of the theme wood of Amboyna.",
      section: "one",
      images: {
        1: "/images/2392/1.png",
        2: "/images/2392/2.png",
        3: "/images/2392/3.png",
      },
    },
    {
      id: 1523,
      title: "Six pointer",
      description:
        "The Player Six Pointer is a unique cue that is a hybrid of the Player Six and the Player Eight. It is a great cue for players who are looking to improve their game.",
      section: "two",
      images: {
        1: "/images/1758/1.png",
        2: "/images/1758/2.png",
        3: "/images/1758/3.png",
      },
    },
    {
      id: 2491,
      title: "The Pinnacle",
      description:
        "The Pinnacle design was named because at the time of its introduction over 6 years ago, this was Jerry's best piece. The cue is distinguished by its hourglass - shaped points and dominating use of the theme wood of Amboyna.",
      section: "two",
      images: {
        1: "/images/2392/1.png",
        2: "/images/2392/2.png",
        3: "/images/2392/3.png",
      },
    },
    {
      id: 2236,
      title: "20th Anniversary",
      description:
        "The Pinnacle design was named because at the time of its introduction over 6 years ago, this was Jerry's best piece. The cue is distinguished by its hourglass - shaped points and dominating use of the theme wood of Amboyna.",
      section: "two",
      images: {
        1: "/images/2392/1.png",
        2: "/images/2392/2.png",
        3: "/images/2392/3.png",
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
