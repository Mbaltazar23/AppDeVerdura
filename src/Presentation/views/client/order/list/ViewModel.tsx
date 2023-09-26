import  { useContext } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { UserContext } from "../../../../context/UserContext";
//import { Order } from "../../../../../Domain/entities/Order";

const ClientOrderListViewModel = () => {
  //const [orders, setOrders] = useState<Order[]>([]);
  const {
    ordersHolding,
    ordersPayed,
    ordersDelivery,
    getOrderByClientAndStatus,
  } = useContext(OrderContext);

  const { user } = useContext(UserContext);

  const getOrders = async (idClient: string, status: string) => {
    const result = await getOrderByClientAndStatus(idClient, status);
    //setOrders(result);
    console.log("ORDERS : " + JSON.stringify(result, null, 3));
  };

  return {
    ordersHolding,
    ordersPayed,
    ordersDelivery,
    getOrders,
    user,
  };
};

export default ClientOrderListViewModel;
