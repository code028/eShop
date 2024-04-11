import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../app/api/productApiSlice';
import InputField from '../../components/InputField/InputField';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

const AddProduct = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState("");

	const [
		AddProduct,
		status
	] = useAddProductMutation();

	const handleProductAdd = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				name,
				price,
				description,
				category,
				quantity
			}

			await AddProduct(body);

			setTimeout(() => {
				navigate("/");
			}, 1500);

		} catch (error) {
			console.error(error);
		}
		
	};

	return (
		<div className='w-full flex justify-center items-center'>
		<form onSubmit={handleProductAdd} className='w-full md:w-1/2 p-5 flex flex-col justify-center items-center gap-5 h-full'>
			<div className='w-full flex justify-center'>
				{status.isLoading && "Vas zahtev se obradjuje"}
				{status.isSuccess && "Uspesno ste sacuvali proizvod"}
				{status.isError && "Greska, pokusajte ponovo!"}
			</div>
			<div className='w-full flex flex-col gap-4 '>
				<label htmlFor='productName' className='w-full flex justify-start px-5 -my-3'>Ime proizvoda:</label>
				<InputField id='productName' style=' m-0 ' value={name} onChange={(event) => setName(event.target.value)} />
				<label htmlFor='productPrice' className='w-full flex justify-start px-5 -my-3'>Cena proizvoda:</label>
				<InputField type='number' id='productPrice' style=' m-0' value={price} onChange={(event) => setPrice(event.target.value)} />
				<label htmlFor='productDescription' className='w-full flex justify-start px-5 -my-3'>Opis proizvoda:</label>
				<InputField id='productDescription' style=' m-0' value={description} onChange={(event) => setDescription(event.target.value)} />
				<label htmlFor='productCategory' className='w-full flex justify-start px-5 -my-3'>Kategorija proizvoda:</label>
				<InputField id='productCategory' style=' m-0' value={category} onChange={(event) => setCategory(event.target.value)} />
				<label htmlFor='productQuantity' className='w-full flex justify-start px-5 -my-3'>Kolicina proizvoda:</label>
				<InputField type='number' id='productQuantity' style=' m-0' value={quantity} onChange={(event) => setQuantity(event.target.value)} />
				<SubmitButton disabled={status.isLoading} style='w-3/4 px-4 py-2'>
					<div className='flex flex-col w-full '>
						Dodaj proizvod
					</div>
				</SubmitButton>
			</div>
		</form>
		</div>
	)
}

export default AddProduct