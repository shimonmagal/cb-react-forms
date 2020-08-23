import React from "react";
import {
	Tags,
  Label,
	Range,
	Email,
  Header,
  Rating,
  TextArea,
	DatePick,
  Dropdown,
  TextInput,
  Paragraph,
  Hyperlink,
	Signature,
  LineBreak,
  Checkboxes,
  NumberInput,
  FileInput,
  RadioButtons,
} from "./index";

export default (item) => {
  switch (item.element) {
    case "Checkboxes":
      return <Checkboxes item={item} />;
    case "Dropdown":
      return <Dropdown item={item} />;
    case "Header":
      return <Header item={item} />;
    case "HyperLink":
      return <Hyperlink item={item} />;
    case "Label":
      return <Label item={item} />;
    case "LineBreak":
      return <LineBreak item={item} />;
    case "NumberInput":
      return <NumberInput item={item} />;
    case "FileInput":
      return <FileInput item={item} />;
    case "Paragraph":
      return <Paragraph item={item} />;
    case "RadioButtons":
      return <RadioButtons item={item} />;
    case "Range":
      return <Range item={item} />;
    case "Rating":
      return <Rating item={item} />;
    case "Tags":
      return <Tags item={item} />;
    case "TextArea":
      return <TextArea item={item} />;
    case "TextInput":
			return <TextInput item={item} />;
		case "Email":
			return <Email item={item} />;
		case "Date":
			return <DatePick item={item} />;
		case "Signature":
			return <Signature item={item} />;
  }
};
