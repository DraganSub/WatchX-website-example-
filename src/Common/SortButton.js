import Button from "../Components/Button";

export default function SortButton(props){
  function handleSorting(){
    props.onClick(props.sortBy, props.direction);
  }
  return(
    <Button onClick={handleSorting}>
      {props.direction==="ascending" ? "A to Z" : "Z to A"}
    </Button>
  );
}