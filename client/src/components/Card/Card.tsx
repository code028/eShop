
export interface ICard {
	id?: string,
	name: string,
	price: number,
	description: string,
	category: string,
	quantity: number
}

const Card: React.FC<ICard> = ({id, name, price, description, category, quantity }) => {
	return (
		<div id={id} className="rounded overflow-hidden shadow-xl relative p-5">
			<img className=" rounded-md" src="https://placehold.jp/250x200.png" alt="Slika" />
			<div className="px-6 py-4 relative">
				<div className="w-full flex justify-between">
					<div className="font-bold text-xl mb-2 ">{name}</div>
					<div className="font-bold text-xl mb-2  underline underline-offset-3">{price} RSD</div>
				</div>
				<p className="text-gray-700 text-base">
					{description}
				</p>
			</div>
			<div className="absolute bottom-0 right-0 my-2 mr-2 py-2 px-4 bg-black text-white font-semibold rounded-md">
				Kolicina {quantity}
			</div>
			<div className="px-6 pt-4 pb-2">
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 -ml-4 mb-2">#{category}</span>
			</div>
		</div>
	)
}

export default Card