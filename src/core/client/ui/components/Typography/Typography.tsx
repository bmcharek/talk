import cn from "classnames";
import React, { Ref } from "react";
import { HTMLAttributes, ReactNode, StatelessComponent } from "react";

import { withForwardRef, withStyles } from "talk-ui/hocs";
import { PropTypesOf } from "talk-ui/types";

import styles from "./Typography.css";

type Variant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "bodyCopy"
  | "bodyCopyBold"
  | "inputLabel"
  | "detail"
  | "timestamp";

// Based on Typography Component of Material UI.
// https://github.com/mui-org/material-ui/blob/303199d39b42a321d28347d8440d69166f872f27/packages/material-ui/src/Typography/Typography.js

interface Props extends HTMLAttributes<any> {
  /**
   * Set the text-align on the component.
   */
  align?: "inherit" | "left" | "center" | "right" | "justify";
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes: typeof styles;
  /**
   * Convenient prop to override the root styling.
   */
  className?: string;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?:
    | "inherit"
    | "primary"
    | "textPrimary"
    | "textSecondary"
    | "textLight"
    | "error"
    | "success";
  /**
   * The container used for the root node.
   * Either a string to use a DOM element, a component, or an element.
   * By default, it maps the variant to a good default headline component.
   */
  container?: React.ReactElement<any> | React.ComponentType<any> | string;
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * We are empirically mapping the variant property to a range of different DOM element types.
   * For instance, h1 to h6. If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` property.
   */
  headlineMapping?: { [P in Variant]?: React.ComponentType<any> | string };
  /**
   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
   */
  noWrap?: boolean;
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph?: boolean;
  /**
   * Applies the theme typography styles.
   */
  variant?: Variant;

  /** Internal: Forwarded Ref */
  forwardRef?: Ref<HTMLElement>;
}

const Typography: StatelessComponent<Props> = props => {
  const {
    align,
    classes,
    className,
    color,
    container,
    gutterBottom,
    headlineMapping,
    noWrap,
    paragraph,
    variant,
    forwardRef,
    ...rest
  } = props;

  const rootClassName = cn(
    classes.root,
    classes[variant!],
    {
      [classes.colorTextPrimary]: color === "textPrimary",
      [classes.colorTextSecondary]: color === "textSecondary",
      [classes.colorTextLight]: color === "textLight",
      [classes.colorPrimary]: color === "primary",
      [classes.colorError]: color === "error",
      [classes.colorSuccess]: color === "success",
      [classes.noWrap]: noWrap,
      [classes.gutterBottom]: gutterBottom,
      [classes.paragraph]: paragraph,
      [classes.alignLeft]: align === "left",
      [classes.alignCenter]: align === "center",
      [classes.alignRight]: align === "right",
      [classes.alignJustify]: align === "justify",
    },
    className
  );

  const Container =
    container || (paragraph ? "p" : headlineMapping![variant!]) || "span";

  const innerProps = {
    ref: forwardRef,
    className: rootClassName,
    ...rest,
  };

  if (React.isValidElement<any>(Container)) {
    return React.cloneElement(Container, innerProps);
  } else {
    return <Container {...innerProps} />;
  }
};

Typography.defaultProps = {
  align: "inherit",
  color: "textPrimary",
  gutterBottom: false,
  headlineMapping: {
    heading1: "h1",
    heading2: "h1",
    heading3: "h1",
    heading4: "h1",
    heading5: "h1",
    bodyCopy: "p",
    bodyCopyBold: "p",
    timestamp: "span",
    inputLabel: "label",
    detail: "p",
  },
  noWrap: false,
  paragraph: false,
  variant: "bodyCopy",
} as Partial<Props>;

const enhanced = withForwardRef(withStyles(styles)(Typography));
export type TypographyProps = PropTypesOf<typeof enhanced>;
export default enhanced;