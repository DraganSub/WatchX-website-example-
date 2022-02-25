export default function getCurrentIndex(array, currentPage, elementsPerPage) {
  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  return array.slice(indexOfFirstElement, indexOfLastElement);
}
