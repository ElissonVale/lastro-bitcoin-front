import { View, Text } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import env from "../../../app.configs";

type TransactionType = {
    id?: string | undefined,
    date: string | undefined,
    amount: string,
    state: "sended" | "received" | "confirm" | "deleted",
    userTo?: string | undefined,
    userFrom?: string | undefined,
    description?: string | undefined,
}

const Transaction = ({ route, navigation }: any) => {
    
    const [transaction, setTransaction] = useState<TransactionType>();

    useEffect(() => {

        setTransaction(route.params.transaction);

    }, [])

    return (
        <View style={Styles.container}>  
            <Header>
                <Text style={{ color: env.COLORS.WHITE, textAlign: "center" }}>Transaction #{transaction && transaction.id}</Text>
            </Header>
            <View>

            </View>

        </View>
    )
}

export {TransactionType, Transaction};