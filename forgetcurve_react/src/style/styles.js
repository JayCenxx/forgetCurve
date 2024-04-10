// styles.js

const baseStyles = {
  container: "flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none",
  span: "font-medium text-sm text-gray-800",
  focusRing: "focus:ring-2 focus:ring-gray-500 focus:outline-none",
};

const buttonStyle = {
  pill_container: `${baseStyles.container} px-4 py-1 `,
  pill_span: `${baseStyles.span} ml-2`,
  round_container: `${baseStyles.container} p-2 h-12 w-12`,
  round_span: baseStyles.span,
  colorRing: baseStyles.focusRing,
  focusColor: "focus:bg-red-500",
};

const cardButtonStyle = {
  card_Container: `${buttonStyle.pill_container} py-2 shadow-md bg-white`,
  card_span: `${buttonStyle.pill_span} md:block hidden`,
  focusColor: "focus:bg-red-500",
};

export { buttonStyle, cardButtonStyle };