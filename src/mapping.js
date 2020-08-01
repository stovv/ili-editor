import { FiEdit3, FiItalic, FiFeather, FiFileText, FiZap } from "react-icons/fi";
import { AllPostsPage, DraftsPage, LoginPage, ModeratePage, PublicationsPage, SchedulePage } from "./pages";

export let Mapping = {
    '/': {
        title: 'Moи черновики',
        contentType: 'menuItems',
        authRequired: true,
        icon: FiFeather,
        page: DraftsPage
    },
    '/published': {
        title: 'Мои публикации',
        contentType: 'menuItems',
        authRequired: true,
        icon: FiEdit3,
        page: PublicationsPage
    },
    '/moderation': {
        title: 'Редактура',
        contentType: 'menuItems',
        userType: 3,
        icon: FiItalic,
        authRequired: true,
        page: ModeratePage
    },
    '/posts': {
        title: 'Посты',
        contentType: 'menuItems',
        userType: 3,
        icon: FiFileText,
        authRequired: true,
        page: AllPostsPage
    },
    '/scheduled': {
        title: 'Запланированные',
        contentType: 'menuItems',
        userType: 3,
        icon: FiZap,
        authRequired: true,
        page: SchedulePage
    },
    '/login':{
        title: 'Вход',
        exclude: true,
        page: LoginPage
    }
};

