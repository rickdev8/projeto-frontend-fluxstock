function getCategoryEmojiLink(category: string): string {
  switch (category.toLowerCase()) {
    case "Camisas":
    case "time":
    case "listradas":
      return "https://em-content.zobj.net/thumbs/240/apple/354/t-shirt_1f455.png";
    case "sShorts":
      return "https://em-content.zobj.net/thumbs/240/apple/354/shorts_1fa73.png";
    case "Calçados":
      return "https://em-content.zobj.net/thumbs/240/apple/354/running-shoe_1f45f.png";
    case "Bones":
      return "https://em-content.zobj.net/thumbs/240/apple/354/billed-cap_1f9e2.png";
    case "Blusas":
      return "https://em-content.zobj.net/thumbs/240/apple/354/womans-clothes_1f45a.png";
    case "Calcas":
      return "https://em-content.zobj.net/thumbs/240/apple/354/jeans_1f456.png";
    case "Utensilhos":
      return "https://em-content.zobj.net/thumbs/240/apple/354/fork-and-knife_1f374.png";
    default:
      return "https://em-content.zobj.net/thumbs/240/apple/354/question-mark_2753.png";
  }
}
