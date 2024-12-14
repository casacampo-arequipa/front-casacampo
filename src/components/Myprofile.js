import useFetch from "../useFetchAdmin";
import Loader from "./Loader";

const MyProfile = () => {
    const { data, loading, error } = useFetch("auth/me");
    if (loading) {
        return <Loader />
    }
    return (
        <div className="text-gray-100">
            <div className="container mx-auto py-10">
                <div className="bg-[#F3F5F4] shadow-lg p-6 rounded-lg mb-6 border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div className="bg-[#b32222] text-white p-6 rounded-lg">
                            <div className='flex justify-between items-center'>
                                <div className='mb-2'>
                                    <h2 className="text-lg mb-2">Reservas</h2>
                                    <p className="text-2xl font-bold">{data?.numres}</p>
                                </div>
                                <i className="fas fa-calendar-alt text-5xl"></i>
                            </div>
                        </div>
                        <div className="bg-white text-gray-800 p-6 rounded-lg">
                            <div className='flex justify-between items-center'>
                                <div className='mb-2'>
                                    <p className="text-lg mb-2">Comentarios</p>
                                    <p className="text-2xl font-bold">{data?.numopinion}</p>
                                </div>
                                <i className="fa-solid fa-comment text-black text-5xl  px-2 rounded-xl mb-2"></i>
                            </div>
                        </div>
                    </div>

                    <div class="border bg-white shadow text-black p-6 rounded-lg">
                        <div class="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                            <div class="flex items-center gap-4">
                                {/* <img src="https://via.placeholder.com/100" alt="Profile Picture" class="w-20 h-20 rounded-full" /> */}
                                <div>
                                    <h2 class="text-xl font-bold">{data?.me?.name} {data?.me?.lastname}</h2>
                                    <span class="bg-[#b32222] text-white text-xs font-semibold px-2 py-1 rounded uppercase">Cliente</span>
                                </div>
                            </div>
                            <button class="bg-[#b32222] hover:bg-[#e8ebe9] hover:border hover:text-black text-white py-2 px-4 rounded">Editar Perfil</button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="mb-4">
                                    <h3 class="font-bold text-lg">Nombre Completo</h3>
                                    <p class="text-lg text-gray-400">{data?.me?.name} </p>
                                </div>
                                <div class="mb-4">
                                    <h3 class="font-bold text-lg">Apellido Completo:</h3>
                                    <p class="text-lg text-gray-400">{data?.me?.lastname}</p>
                                </div>
                                <div class="mb-4">
                                    <h3 class="font-bold text-lg">Correo Electrónico</h3>
                                    <p class="text-lg text-gray-400">{data?.me?.email}</p>
                                </div>
                            </div>
                            <div>
                                <div class="mb-4 ">
                                    <h3 class="font-bold text-lg">Pais de:</h3>
                                    <p class="text-lg text-gray-400">{data?.me?.country || 'No especificado'}</p>
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg">Número de Celular:</h3>
                                    <p class="text-lg text-gray-400">{data?.me?.phone}</p>
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg mt-2">Contraseña:</h3>
                                    <p class="text-lg text-gray-400">*******</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border shadow mt-6 text-black p-6 rounded-lg">
                        <div className="flex justify-between">
                            <h3 class="text-lg font-bold mb-4 w-full">Mis Reservas</h3>
                            <h3 class="text-lg font-bold mb-4 w-full text-end">Recuerda que tienes un plazo de 30 min para realizar el pago</h3>
                        </div>

                        <div class="flex justify-between mb-4">
                            <input type="date" placeholder="Search by Order ID" class="text-black rounded px-4 py-2" />
                            <select class="bg-[#F3F5F4]  text-blackrounded px-4 py-2">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                            </select>
                        </div>
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b border-gray-600">
                                    <th class="py-2">Fecha de Reserva</th>
                                    <th class="py-2">Check In</th>
                                    <th class="py-2">Check Out</th>
                                    <th class="py-2">Estado</th>
                                    <th class="py-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.me?.reservations.map((reservation, index) => (
                                    <tr key={index} class="border-b border-gray-600">
                                        <td class="py-2">{reservation.date_reservation}</td>
                                        <td className="py-2">{reservation.date_start.split(" ")[0]}</td>
                                        <td className="py-2">{reservation.date_end.split(" ")[0]}</td>
                                        <td
                                            className={`font-semibold rounded ${reservation.state === 0 ? "text-red-500" : "text-green-500"
                                                }`}
                                        >
                                            {reservation.state === 0 ? "Falta pagar" : "Pagado"}
                                        </td>
                                        <td class="py-2 ">S./ {reservation.total_price}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>);
}
export default MyProfile;