import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPharmacies } from "../store/pharmaciesSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Main = () => {
    const dispatch = useDispatch()
    const pharmacies = useSelector(state => state.pharmacies.pharmacies)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()
      
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('http://localhost:3000/pharmacies');
                dispatch(setPharmacies(response.data)) 
    
            } catch (error) {
                console.error('Помилка отримання даних про аптеки:', error);
              }
        }
        fetch()
    }, [])

    const addPharmacy = async ({name, street}) => {
        const response = await axios.post('http://localhost:3000/addPharmacies', {
            id: pharmacies[pharmacies.length - 1].id + 1,
            name,
            street,
            goods: []
        });
        navigate(0)

    }
    
    const deletePharmacy = async (e, pharmacyId) => {
        e.preventDefault()
        const response = await axios.delete(`http://localhost:3000/deletePharmacies/${pharmacyId}`);
        navigate(0)
    }

    const handleEditButton = (e,id) => {
        e.preventDefault()
        setIsOpen(prev=>prev ? '' : `${id}`)
    }

    const editPharmacy = async ({name, street}) => {
        const response = await axios.put(`http://localhost:3000/updatePharmacies/${+isOpen}`, {
            name,
            street
        });

        navigate(0)


        // dispatch(setPharmacies(response))
    }

    return ( 
        <div className="container mt-10 mx-auto">
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search..."/>            
            {pharmacies.length && pharmacies.filter(el => el.name.includes(search)).map(el => (
                <Link to={`/pharmacies/${el.id}`} key={el.id} className="w-full mt-3 h-16 border-2 border-red-900 flex justify-center items-center rounded-sm">
                    {el.name} <br />
                    {el.street} <br />
                    {isAdmin && (
                        <>
                            <button className="w-24 ml-5" onClick={(e) => handleEditButton(e, el.id)}>Edit</button>
                            <button className="w-24 ml-5" onClick={(e) => deletePharmacy(e,el.id)}>Delete</button>
                        </>
                    )}
                </Link>
            ))}
            {isAdmin && (
                <div className="flex justify-center text-3xl mt-5">
                    <div className="border-2 flex justify-center items-center rounded-full cursor-pointer" onClick={() => setIsOpen(prev=>prev.length ? '' : 'Add')}>+</div>
                </div>
            )}
            {isOpen.length && (
                <form onSubmit={handleSubmit(isOpen === 'Add' ? addPharmacy : editPharmacy)}>
                    <input {...register('name')} type="text" placeholder="name" />
                    <input {...register('street')}type="text" placeholder="street" />
                    <button>submit</button>
                </form>
            )}
        </div>
    );
}
 
export default Main;