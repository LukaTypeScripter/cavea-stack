import { log } from 'console';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type User = {
    id: number;
    name: string;
    location: string;
    price: number;
  }
export default function Listing() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(21);
  
    useEffect(() => {
      fetch('http://localhost:8080/users')
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error(error));
    }, []);
    {/**ცხრილში ბოლო ნივთის ინდექსი,ქვემოთ კი პირველი. */}
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
   
    
    {/**წაშლის ლოგიკა*/}
     const delateUser = (id:number) => {
        fetch(`http://localhost:8080/users/${id}`, {
            method:'DELETE'
        }).then((response) => response.json())
        .then((data) => {
            setUsers(users.filter((user) => user.id !==id))
        }).catch((error) => console.log(error))
    }
    {/**ეს იმიტომ გავაკეთე რომ შეგვეძლოს კოდის გამარტივება და პატარა ნაწილებად დაყოფა,ადვილად მენეჯმენტისთვის. */}
    const renderTableData = currentItems.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.location}</td>
          <td>{user.price}</td>
          <td>
           
            <button className='btn btn-danger' onClick={() => delateUser(user.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
    {/** ამ ფუნქცისს გამოყენებით შეგვიძლია დავთვალოთ და გავიგოთ თუ რომელ გვერძე ვართ.ლოგიკა მარტივია და ადვილი გამოსაყენებელი.*/}
    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
            onClick={() => setCurrentPage(i)}
          >
            <a href='!#' className='page-link'>
              {i}
            </a>
          </li>
        );
      }
      return pageNumbers;
    };

  

  return (
    <div className='container'>
        <div className='card'>
            <div className='card-title'>
                <h2 className='text-center'>Inventory
management</h2>
            </div>
            <div className='card-body'>
                <div>
                    <Link to={'/Inventory/create'} className='btn btn-success '>ახალი ნივთის დამატება</Link>
                </div>
                <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <td>ნივთის სახელი</td>
                        <td>ნივთის ადგილმდებარეობა</td>
                        <td>ფასი (ლარებში)</td>
                        <td>ოპერაციები</td>
                    </tr>
                </thead>
                <tbody>
                    {/**კოდის გამარტივებისთვის,ასევე შეგვეძლოს refactor.*/}
                    {renderTableData}
                </tbody>
                </table>
                <nav aria-label='Page navigation'>
            <ul className='pagination'>{renderPageNumbers()}</ul>
          </nav>
            </div>
        </div>

    </div>
  )
}
