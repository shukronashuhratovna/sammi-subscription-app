import Image from "next/image"
import { useAuth } from "src/hooks/useAuth"
import { useContext } from 'react'
import { RiVipCrown2Line } from 'react-icons/ri'
import { AiOutlineHourglass, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Product } from "src/interfaces/app.interface";
import { AuthContext } from "src/context/auth.context";

const SubscriptionPlan = ({ products }: SubscriptionPlanProps) => {
    const { logout } = useAuth();
    const { user } = useContext(AuthContext)

    const onSubmitSubscription = async (priceId: string) => {
        const payload = { email: user?.email, priceId }
        const res = await fetch('/api/subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        window.open(data.subscription.url)

    }

    return (
        <div className="min-h-screen">
            <div className="border-b-2 border-gray-300/20 h-[10vh] flex justify-between items-center px-4 md:px-10">
                <Image src={'/logo.svg'} width={56} height={56} alt="logo" className="cursor-pointer object-contain" />
                <div onClick={logout} className='cursor-pointer hover:underline'>Logout</div>
            </div>
            <div className="flex flex-col space-y-4 text-center pt-5">
                <h1 className="text-2xl md:text-5xl text-shadow-sm">Flexible pricing for enjoyin</h1>
                <p className="text-xl text-shadow">Relaxing with watchin your favourite movies and tv.</p>
            </div>
            <div className="flex justify-center items-center py-20">
                <div className="md:grid md:px-4 md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                    {/* Card plans */}
                    {products.map((product) => (
                        <div key={product.id} className="max-w-sm cursor-pointer bg-white/20 px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                            <h3 className="mb-3 text-xl font-bold text-[#E10856]">{product.name}</h3>
                            <div className="relative">
                                <img src={product.images[0]}
                                    alt="Vip"
                                    className="rounded-xl w-full" />
                                <p className="absolute top-0 bg-black/90 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                                    {(product.default_price.unit_amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                                <div className="absolute rounded-xl top-0 left-0 right-0 bottom-0 bg-black/20" />
                            </div>
                            <div className="border-[1px] border-white/20 mt-4" />
                            <button onClick={() => onSubmitSubscription(product.default_price.id)} className='mt-4 w-full bg-[#E10856] py-4 rounded hover:!opacity-80 font-semibold'>BUY PLAN</button>
                            <div className="my-4">
                                {product.metadata.adv.split(', ').map((c, id) => (
                                    <div key={id} className="flex space-x-2 items-center">
                                        {id === 0 && <RiVipCrown2Line className="w-5 h-5" />}
                                        {id === 1 && <AiOutlineHourglass className="w-5 h-5" />}
                                        {id === 2 && <AiOutlineVideoCameraAdd className="w-5 h-5" />}
                                        <p>{c}.</p>
                                    </div>

                                ))}
                            </div>
                        </div>

                    )).reverse()
                    }
                </div>
            </div>
        </div>
    )
}
// https://shorturl.at/jNOX7
// https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80
// https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80
// https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80

export default SubscriptionPlan

interface SubscriptionPlanProps {
    products: Product[]
}