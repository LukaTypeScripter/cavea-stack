import { log } from "console";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalShow from "../components/Modal";
import Spinner from "../components/Spinner";

type User = {
  id: number;
  name: string;
  location: string;
  price: number;
};

export default function Listing() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(21);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
const items = users.length
{/**fetching-ნივთებს და სორტირებას ვაკეთბ */}
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/Inventories?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await res.json();
      data.sort((a:User, b:User) => a.name.localeCompare(b.name));
      data.sort((a:User, b:User) => a.price - b.price);
      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);




  function handleDeleteClick(id: number) {
    setUserIdToDelete(id);
    setShowModal(true);
  }

  {
    /**წაშლის ლოგიკა*/
  }
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/Inventories/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setUsers(users.filter((user) => user.id !== userIdToDelete));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
 
  
  {
    /** ამ ფუნქცისს გამოყენებით შეგვიძლია დავთვალოთ და გავიგოთ თუ რომელ გვერძე ვართ.ლოგიკა მარტივია და ადვილი გამოსაყენებელი.*/
  }
  {/**არ მინდოდა რამე პაგინაციი library დამეყენებინა ამიტომ გავაკეთ შემდეგნაირად. */}
   const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            <a href="!#" className="page-link">
              {i}
            </a>
          </li>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - maxPageNumbers);
      let endPage = Math.min(totalPages, currentPage + maxPageNumbers);

      if (currentPage <= maxPageNumbers) {
        endPage = maxPageNumbers * 2;
      } else if (currentPage >= totalPages - maxPageNumbers) {
        startPage = totalPages - maxPageNumbers * 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - maxPageNumbers && i <= currentPage + maxPageNumbers)
        ) {
          pageNumbers.push(
            <li
              key={i}
              className={`page-item ${currentPage === i ? "active" : ""}`}
              onClick={() => setCurrentPage(i)}
            >
              <a href="!#" className="page-link">
                {i}
              </a>
            </li>
          );
        } else if (i === startPage + 1 || i === endPage - 1) {
          pageNumbers.push(
            <li key={i}>
              <span>...</span>
            </li>
          );
        }
      }
    }

    return pageNumbers;
  };




  {/**ფილტრაცია */}
  const [selectedLocation, setSelectedLocation] = useState('All');
 
  const handleLocationChange = (event:any) => {
    setSelectedLocation(event.target.value);
  };
 

  {
    /**ეს იმიტომ გავაკეთე რომ შეგვეძლოს კოდის გამარტივება და პატარა ნაწილებად დაყოფა,ადვილად მენეჯმენტისთვის. */
  }
  {/**გადავაკეთე რომ იპოვოს ლოკაციის მიხედვით ასევე იყოს 20 ინვენტორი დაგადავიდეთ პიგნაციით. */}
  const filteredUsers = selectedLocation === 'All' 
  ? users 
  : users.filter(user => user.location === selectedLocation);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedUsers = filteredUsers.slice(startIndex, endIndex);
const itemsLeft =displayedUsers.length





const renderTableData = displayedUsers.map((user, index) => (
  <tr key={index}>
    <td>{user.name}</td>
    <td>{user.location}</td>
    <td>{user.price}</td>
    <td>
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteClick(user.id)}
      >
        წაშლა
      </button>
    </td>
  </tr>
));

  return (
    <>
    {/**ტერნერული ოპერაცია რადგან ბევრი დათა როცა გვაქ დრო სჭირდება რესპონსს. */}
    {isLoading ? (<Spinner/>) : (
        <div className="container">
        <div className="card">
          <div className="card-title">
            <h2 className="text-center">Inventory management</h2>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-center pt-3">
           
            </div >
            <div className="d-flex justify-content-between">
              <Link to={"/Inventory/create"} className="btn btn-success ">
                ახალი ნივთის დამატება
              </Link>
              
              <select value={selectedLocation} onChange={handleLocationChange} >
            <option value="All">All</option>
            <option value="მთავარი ოფისი">მთავარი ოფისი</option>
            <option value="კავეა გალერია">კავეა გალერია</option>
            <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
            <option value="კავეა ისთ ფოინთი">კავეა თბილისი მოლი</option>
            <option value="კავეა სითი მოლი">კავეა თბილისი მოლი</option>
          </select>
          
            </div>
            
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ნივთის სახელი</td>
                  <td>ნივთის ადგილმდებარეობა</td>
                  <td>ფასი (ლარებში)</td>
                  <td>ოპერაციები</td>
                </tr>
              </thead>
              <tbody>
                {/**კოდის გამარტივებისთვის,ასევე შეგვეძლოს refactor.*/}
                <ModalShow showModal={showModal} setShowModal={setShowModal}  deleteUser={deleteUser}  userIdToDelete={userIdToDelete}/>
            {/**ფილტრაციით */}
            {renderTableData}
                
   
              </tbody>
            </table>
            <nav aria-label="Page navigation">
    <div className="d-flex">
     
      <div className="col-md-6 d-flex justify-content-between ">
        <ul className="pagination">
          {renderPageNumbers()}
        </ul>
        <b className=""><span className="fs-5">დარჩენილი რაოდენობა:</span>{selectedLocation =='All' ?  items : itemsLeft}</b>
      </div>
    </div>
  </nav>
          </div>
        </div>
      </div>
      )}
   
    </>
  );
}
