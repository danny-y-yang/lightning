import axios from "axios";

export default function deleteThought(id: string) {
  axios.delete(`http://localhost:5000/thought/delete/${id}`);
}
