import { View } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";
import { ButtonDefault, ButtonIcon } from "../../components/Buttons";
import { deleteAccount } from "../../services/Authenticate";
import { useEffect, useState } from "react";
import Splashscreen from "../../components/SplashScreen";
import MessageBox, { showMessage } from "../../components/MessageBox";

const Account = ({ navigation }: any) => {

    const [loading, setLoading] = useState(true);
    const [notifyLoading, setNotifyLoading] = useState<string>();

    const lastPage = () => { 
        navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
    }

    const handleDelete = async () => {
        
        setLoading(true);

        if(await deleteAccount({ notifyProgress: setNotifyLoading }))
            navigation.reset({ index: 0, routes: [ { name: "Initialize" } ] });
        else
            showMessage({ message: "Sorry, ocurrer error during retry delete your account!" });
        setLoading(false);
    }

    useEffect(() => {
        // Load data  from API

        setLoading(false);
    }, []);

    if(loading)
        return <Splashscreen message={notifyLoading} />

    return (
        <>
            <View style={Styles.container}>
                
                <Header>
                    <ButtonIcon icon="arrow-back" size={28} buttonStyles={[Styles.returnButton]} onPress={lastPage} />
                </Header>

                <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                    <ButtonDefault title="Delete" icon="trash" onPress={handleDelete}/>
                </View>
                
            </View>
            <MessageBox />
        </>
    );
}

export default Account;