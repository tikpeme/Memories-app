import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "8rem",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    position: "relative",
    margin: "10px",
    height: "27em",
  },
  cardContent: {
    height: "10px",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  tagsSection: {
    display: "flex",
    justifyContent: "space-between",
    margin: "9px",
    //border: "red solid 2px",
    width: "auto",
    height: "2.3rem",
    overflow: "scroll",
    //marginBottom: "0",
  },
  titleSection: {
    display: "flex",
    justifyContent: "space-between",
    //border: "red solid 2px",
    //width: "auto",
    height: "3.5rem",
    overflow: "scroll",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  location: {
    display: "flex",
    padding: "5px",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  detailSections: {
    overflow: "auto",
  },
  cardTopSection: {
    display: "flex",
    //border: "10px solid red",
  },
  messageSection: {
    padding: "0 16px",
    height: "5.5rem",
    overflow: "scroll",
    //border: "1px solid red",
  },
});
