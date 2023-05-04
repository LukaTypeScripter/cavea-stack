import React from 'react'
import { Link } from 'react-router-dom'

export default function Listing() {
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
                    {/**api fetch for get data*/}






                </tbody>
                </table>
            </div>
        </div>

    </div>
  )
}
