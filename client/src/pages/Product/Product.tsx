import React, { useEffect, useState } from 'react';
import { useGetProductByIdQuery, useUpdateProductByIdMutation } from '../../app/api/productApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { CornerDownLeft, Settings } from 'lucide-react';
import InputField from '../../components/InputField/InputField';

const Product = () => {
	const navigate = useNavigate();
	const { id: productId } = useParams();

	const [isEditing, setIsEditing] = useState(false);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState("");

	const {
		data: productData,
		isLoading: isProductDataLoading,
		isSuccess: isProductDataSuccess,
		isError: isProductDataError
	} = useGetProductByIdQuery(productId!, {
		skip: !productId
	});

	const [
		updateProduct,
		status
	] = useUpdateProductByIdMutation();

	useEffect(() => {
		if (productData) {
			// @ts-ignore
			setName(productData.product.name);
			// @ts-ignore
			setPrice(productData.product.price);
			// @ts-ignore
			setDescription(productData.product.description);
			// @ts-ignore
			setCategory(productData.product.category);
			// @ts-ignore
			setQuantity(productData.product.quantity);
		}

	}, [productData]);

	const handleProductUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
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

			await updateProduct({id: productId, body})

			setTimeout(() => {
				setIsEditing(false);
				navigate(0);
			}, 1000);
		} catch (error) {
			console.error(error);
		}

	};

	return (
		<div className='w-full h-fit flex select-none p-5'>
			<div className='w-full flex flex-col md:flex-row justify-center items-center'>
				<div className='w-full md:w-1/2 lg:w-2/3 flex justify-center items-center'>
					<img className="rounded-md" src="https://placehold.jp/400x550.png" alt="Slika" />
				</div>
				<div className={`w-full md-1/2 lg:w-2/3 flex flex-col p-5 relative`}>
					<Settings className='absolute top-0 right-10 cursor-pointer' onClick={() => setIsEditing(!isEditing)} />

					{
						isEditing ?
							<form onSubmit={handleProductUpdate} className='w-full p-5 flex justify-center flex-col gap-5 h-full'>
								<div className='w-full flex justify-center'>
									{status.isLoading && "Vas zahtev se obradjuje"}
									{status.isSuccess && "Promene su uspesno sacuvane"}
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
											Sacuvajte izmene
										</div>
									</SubmitButton>
								</div>
							</form>
							:
							<>
								<SubmitButton disabled style='w-3/4 px-4 py-2'>
									<div className='flex flex-col w-full '>
										{/* @ts-ignore */}
										Naziv proizvoda: {productData?.product?.name}
									</div>
								</SubmitButton>
								<SubmitButton disabled style='w-3/4 px-4 py-2'>
									<div className='flex flex-col w-full '>
										{/* @ts-ignore */}
										Cena: {productData?.product?.price}
									</div>
								</SubmitButton>
								<SubmitButton disabled style='w-3/4 px-4 py-2'>
									<div className='flex flex-col w-full '>
										{/* @ts-ignore */}
										Opis: {productData?.product?.description}
									</div>
								</SubmitButton>
								<SubmitButton disabled style='w-3/4 px-4 py-2'>
									<div className='flex flex-col w-full '>
										{/* @ts-ignore */}
										Kategorija: {productData?.product?.category}
									</div>
								</SubmitButton>
								<SubmitButton disabled style='w-3/4 px-4 py-2'>
									<div className='flex flex-col w-full '>
										{/* @ts-ignore */}
										Na lageru: {productData?.product?.quantity} komada
									</div>
								</SubmitButton>
								<SubmitButton disabled={false} style='w-3/4 px-4 py-2 bg-green-500 outline-none'>
									<div className='flex justify-center items-center gap-2 w-full' >
										{/* @ts-ignore */}
										Dodaj proizvod u korpu
										<CornerDownLeft />
									</div>
								</SubmitButton>
							</>
					}
				</div>
			</div>
		</div>
	)
}

export default Product