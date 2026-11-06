import { group, line } from "../../document/index.js";
import { skip } from "../../utilities/skip.js";
import { locEnd, locStart } from "../location/index.js";
import { isBlockComment } from "../utilities/comment-types.js";
import { getComments } from "../utilities/comments.js";
import { printAssignment } from "./assignment.js";
import { printComment } from "./comment.js";
import { printKey } from "./key.js";

const skipInlineWhitespace = skip(/[^\S\n]/u);

/*
- `Property`
- `ObjectProperty`
- `ImportAttribute`
*/
function printProperty(path, options, print) {
  const { node } = path;
  if (node.shorthand) {
    return print("value");
  }

  const property = printAssignment(
    path,
    options,
    print,
    printKey(path, options, print),
    ":",
    "value",
  );

  if (node.computed) {
    const comments = getComments(node);
    const index = comments.findIndex(
      (comment) =>
        comment.leading &&
        isBlockComment(comment) &&
        skipInlineWhitespace(options.originalText, locEnd(comment)) ===
          locStart(node),
    );
    if (index !== -1) {
      // Prefer breaking after the comment before breaking the key itself.
      const commentDoc = path.call(
        () => printComment(path, options),
        "comments",
        index,
      );
      options[Symbol.for("printedComments")].add(comments[index]);
      return [group([commentDoc, line]), property];
    }
  }

  return property;
}

export { printProperty };
