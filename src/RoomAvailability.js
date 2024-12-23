import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteRoom, getRoom } from "./api";

function Rooms(){
  const[rooms, setRooms]= useState();

  useEffect(() => {
      const fetchRoom = async () => {
          const data = await getRoom();
          setRooms(data);
      };
      fetchRoom();
  }, []);

  const handleDeletion = async (room_id)=>{
    try{
      await deleteRoom(room_id);
    }
   catch (error) {
    console.error('Error deleting room:', error);
    }
  };

    const columns =[
        {
          name: 'Room ID',
          selector:row =>row.room_id
        },
        {
          name: 'Availability Status',
          selector:row =>row.availability_status
        },
        {
          name: 'Price Per Day',
          selector:row =>row.price_per_day
        },
        {
          name: 'Building',
          selector:row =>row.building_id
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to={`/UpdateRoom/${row.room_id}`}>
                <button class="button3">Update</button>
              </Link>
              <button class="button4" onClick={e=> handleDeletion(row.room_id)}>Delete</button>
            </div>
          ),
        },
    
      ];

    return(
        <div>
          <Link to={'/AddRoom'}>
                <button class="button1">Add Room</button>
              </Link>
              <Link to={'/'}>
                <button class="button2">Home Page</button>
              </Link>
              
            <DataTable
            columns={columns}
            data={rooms}>
              
            </DataTable>

        </div>

    );
}
export default Rooms;