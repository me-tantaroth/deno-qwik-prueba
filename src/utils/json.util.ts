export class JSONUtil {
  cleanText(text: string) {
    let withinQuotes = false;
    let result = "";

    for (let i = 0; i < text.length; i++) {
      const character = text[i];

      if (character === '"') {
        withinQuotes = !withinQuotes;
      }

      if (!withinQuotes && character === " ") {
        continue;
      }

      result += character;
    }

    return result;
  }

  extractObject(text: string) {
    const objectRegexp = /{[^{}]+}/.exec(
      text.trim().replaceAll("\n", "").replaceAll("\r", "").replaceAll("\t", "")
    );

    if (objectRegexp) {
      const jsonString = this.cleanText(objectRegexp[0])
        .replaceAll(":'", ':"')
        .replaceAll("',", '",')
        .replace(/(\w+)(?=:")/g, '"$1"');

      try {
        return JSON.parse(jsonString);
      } catch (error: SyntaxError | any) {
        return {};
      }
    }
    return {};
  }
}
