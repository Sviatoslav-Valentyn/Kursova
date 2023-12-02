import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ListOfMedicines = () => {
    const [info, setInfo] = useState('')
    const {id} = useParams()
    const [isOpen, setIsOpen] = useState('')
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const isAdmin = useSelector(state => state.auth.isAdmin)
    const {register, handleSubmit, formState: {errors}} = useForm()
    

    useEffect(() => {
        const getMedicines = async () => {
            const response = await axios.get(`http://localhost:3000/pharmacies/${id}`)
            setInfo(response.data.goods)
        }   

        getMedicines()
    }, [])

    const editMedicine = async ({name, description, price}) => {
        const response = await axios.put(`http://localhost:3000/pharmacies/${id}/goods/${isOpen}`, {
            newName: name,
            description,
            price
        });
        navigate(0)
    }

    const addMedicine = async ({name, description, price}) => {
        const response = await axios.post(`http://localhost:3000/pharmacies/${id}/addProduct`, {
            name,
            description,
            price
        });
        navigate(0)
    }

    const deleteMedicine = async (itemName) => {
        const response = await axios.delete(`http://localhost:3000/pharmacies/${id}/goods/${itemName}`);
        window.location.reload()
        navigate(0)
    }
    return ( 
        <div className="container mt-10 mx-auto"> 
            <button className="w-16 mb-2" onClick={() => navigate('/pharmacies')}>Back</button>
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search..."/>            
            {info.length && info.filter(el => el.name.toLowerCase().includes(search.toLocaleLowerCase())).map(el => (
                <div className="border-2 border-l-fuchsia-500 mt-5 pl-4">
                    Name: {el.name} <br />
                    Description: {el.description} <br />
                    Price: {el.price}$ <br />
                    {isAdmin && (
                        <>
                            <button className="w-24 ml-5" onClick={() => setIsOpen(prev=>prev.length ? '' : el.name)}>Edit</button>
                            <button className="w-24 ml-5" onClick={() => deleteMedicine(el.name)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            {isAdmin && (
                <div className="flex justify-center text-3xl mt-5">
                    <div className="border-2 flex justify-center items-center rounded-full cursor-pointer" onClick={() => setIsOpen(prev=>prev.length ? '' : 'Add')}>+</div>
                </div>
            )}
            {isOpen && (
                <form onSubmit={handleSubmit(isOpen === 'Add' ? addMedicine : editMedicine)}>
                    <input {...register('name')} type="text" placeholder="name" />
                    <input {...register('description')}type="text" placeholder="description" />
                    <input {...register('price', {pattern: {value: /^[0-9]+$/, message: 'Please enter a number'}})} type="text" placeholder="price" />
                    <button>submit</button>
                </form>
            )}
        </div>
     );
}
 
export default ListOfMedicines;