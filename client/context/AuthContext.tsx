import React, {
    SetStateAction,
    Dispatch,
    createContext,
    useContext,
    FunctionComponent,
    useState,
    useEffect,
} from 'react';
import { User } from 'interfaces';
import { publicFetch } from 'utils';

interface AuthContextType {
    loading: boolean;
    user?: User;
    setUser: Dispatch<SetStateAction<User>>;
};

const AuthContext = createContext<AuthContextType>(null as any);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FunctionComponent = ({ children }) => {
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            const { data } = await publicFetch.get('/users');
            setUser(data);
            setLoading(false);
        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ loading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;