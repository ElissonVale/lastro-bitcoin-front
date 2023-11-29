import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import env from "../../../app.configs";
import { Ionicons } from "@expo/vector-icons";
import { TransactionType } from "../../pages/bank/Transaction";
import Styles from "../../stylesheet/Styles";


type Props = {
    navigation?: any | undefined,
    transactions: Array<TransactionType>
}


const Transactions = ({ navigation, transactions } : Props) => {
  
    const handleTransactionClick = (transaction: TransactionType) => {
        navigation.navigate("Transaction", { transaction });
    }

    if(transactions && transactions?.length <= 0) {
        return (
            <>
                <View style={styles.container_transactions}>
                    <Text style={styles.nothing_transactions}>Nothing transactions</Text>
                    <View style={{ flex: 1,  alignItems: "center", width: "100%", height: 180 }}>
                        <View style={Styles.endPage}></View>
                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            {
                transactions && transactions.map((transaction, index) => {

                    let amount_color = transaction.amount.includes("-") ? env.COLORS.RED : env.COLORS.GREEN;

                    transaction.description = transaction.description ? transaction.description.substring(0, 50) : "No description";

                    if(transaction.description.length == 50) 
                        transaction.description = `${transaction.description}...`;

                    if(!transaction.amount.includes("-") && !transaction.amount.includes("+"))
                        transaction.amount = `+${transaction.amount}`;
                    
                    return (
                        <TouchableOpacity key={index} style={styles.container_transactions} onPress={() => { handleTransactionClick(transaction) }} >   
                            <View style={styles.container_transaction} >   
                                <View style={[styles.info, { width: "12%", left: 0, top: "34%" }]}>
                                    <Ionicons name="checkmark-done" size={30} color={env.COLORS.GREEN} />
                                </View>
                                <View style={[styles.info, { width: "54%", left: "15%", top: -10 }]}>
                                    <Text style={{ color: env.COLORS.WHITE, paddingTop: 0 }}>{transaction.description}</Text>
                                    <Text style={{ color: env.COLORS.WHITE, paddingTop: 18 }}>{transaction.date}</Text>
                                </View>
                                <View style={[styles.info, { width: "30%", left: "72%", top: -68 }]}>
                                    <Text style={[styles.transaction_amount, { color: amount_color }]}>{transaction.amount}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
             <View style={{ flex: 1,  alignItems: "center", width: "100%", height: 180 }}>
                <View style={Styles.endPage}></View>
             </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_transactions: {
        width: "100%",
        backgroundColor: env.COLORS.BLACK,
    },
    container_transaction: {
        margin: 5,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, .05)", 
        borderRadius: 18
    }, 
    transaction_amount: {
        textAlign: "center", 
        fontSize: 15
    },
    info: { 
        top: 10,  
        margin: 0,
        // borderWidth: 1,
        // borderColor: "#fff",
        position: "relative", 
    },
    last_transaction_empty: {
        flex: 1,  
        alignItems: "center", 
        width: "100%", 
        height: 180 
    },
    nothing_transactions: {
        color: env.COLORS.GRAY,
        textAlign: "center",
        margin: 50,
        padding: 10,
        backgroundColor: "rgba(255,255,255, .05)",
        borderRadius: 15
    }
});

export default Transactions;