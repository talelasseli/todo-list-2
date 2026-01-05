const AddList = () => {
  const handleClick = () => {
    console.log("Add New List Clicked");
  };
  return <button onClick={handleClick}>Add New List</button>;
};

export default AddList;
