import { useContext } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import exit from "../../../assets/icons/exit";
import leftArrow from "../../../assets/icons/left-arrow";
import IconShare from "../../../components/ui/Icon";
import { AuthContext } from "../../../store/auth-context";

const SettingsScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const userData = await getUser();
    //             setUser(userData);
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

    function handleLogout() {
        authCtx.logout();
        navigation.replace('AuthStack');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <View style={styles.leftArrow}>
                        <IconShare width={18} height={15} xmlData={leftArrow} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <TouchableOpacity
                    onPress={() => handleLogout()}
                >
                    <View style={styles.exit}>
                        <IconShare width={18} height={18} xmlData={exit} />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Text style={styles.sectionTitle}>Account</Text>
                <View style={[styles.sectionContainer, { borderRadius: 10 }]}>
                    <TouchableOpacity style={[styles.item, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                        <Text style={styles.itemText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>Preferences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.item, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                        <Text style={styles.itemText}>Privacy & Security Settings</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Subscription</Text>
                <View style={[styles.sectionContainer, { borderRadius: 10 }]}>
                    <TouchableOpacity style={[styles.item, { borderRadius: 10 }]}>
                        <Text style={styles.itemText}>Manage Subscription</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Support</Text>
                <View style={[styles.sectionContainer, { borderRadius: 10 }]}>
                    <TouchableOpacity style={[styles.item, { borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                        <Text style={styles.itemText}>Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.item, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                        <Text style={styles.itemText}>Terms of Service</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 27,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingVertical: 10,
        marginBottom: 36,
        alignItems: 'center',
    },
    exit: {
        backgroundColor: '#FFFFFF1A',
        borderWidth: 1,
        borderColor: '#D4D4D433',
        padding: 10,
        borderRadius: 25,
    },
    leftArrow: {
        backgroundColor: '#FFFFFF1A',
        borderWidth: 1,
        borderColor: '#D4D4D433',
        padding: 10,
        paddingVertical: 11.5,
        borderRadius: 25,
    },
    title: {
        fontFamily: 'roboto-bold',
        fontSize: 20,
        color: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'roboto-bold',
        color: '#FFFFFF',
        marginBottom: 18,
    },
    sectionContainer: {
        backgroundColor: '#FFFFFF1A', 
        marginBottom: 20,
    },
    item: {
        padding: 16,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: '#D4D4D433',
    },
    itemText: {
        color: '#FFFFFF',
        fontFamily: 'roboto-medium',
        fontSize: 16,
    },
    versionText: {
        color: '#B4B4B4',
        fontFamily: 'roboto-mono-bold',
        fontSize: 16,
        marginTop: 24,
    },
});