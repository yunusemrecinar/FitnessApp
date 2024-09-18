import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import settings from "../../../assets/icons/settings";
import IconShare from "../../../components/ui/Icon";
import { AuthContext } from "../../../store/auth-context";

const ProfileScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //                 const userData = await getUser();
    //                 setUser(userData);
    //         } catch (error) {
    //             Alert.alert('Error', error.message || 'Failed to load user data');
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    // const handleLogout = async () => {
    //     try {
    //         await logout();
    //         Alert.alert('Success', 'Logged out successfully');
    //         authCtx.logout();
    //         navigation.replace('AuthStack');
    //     } catch (error) {
    //         Alert.alert('Error', error.message || 'Failed to log out');
    //     }
    // };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                >
                    <View style={styles.settings}>
                        <IconShare width={21} height={21} xmlData={settings} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 27,
    },
    header: {
        alignItems: 'flex-end',
        marginTop: 50,
        paddingVertical: 10,
        marginBottom: 45,
    },
    settings: {
        backgroundColor: '#FFFFFF1A',
        borderWidth: 1,
        borderColor: '#D4D4D433',
        padding: 8,
        borderRadius: 25,
    },
});