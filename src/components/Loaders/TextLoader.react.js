import React from "react";
import Typist from 'react-typist';
import { Box } from 'rebass';
import { withTheme } from "styled-components";

import { Typography } from "../index";


const TextLoader =({theme}) => (
    <Box sx={{transform: 'translate(-50%, -50%)', top: "50%", left: "50%", position: 'absolute'}}>
        <Typography.XLarge margin="50px auto" textAlign="center" width="100%" color={theme.text.editorSecondary}>
            <Typist avgTypingDelay={100} stdTypingDelay={50}>
                Грузим...
                <Typist.Delay ms={600} />
                <br/>
                Чекаем...
                <Typist.Delay ms={600} />
                <br/>
                Проверяем...
                <Typist.Delay ms={600} />
                <br/>
                Анализируем...
                <Typist.Delay ms={600} />
                <br/>
                Ищеем...
                <Typist.Delay ms={1000} />
                <br/>
                Долго как-то🤔
                <Typist.Delay ms={1000} />
                <br/>
                Уже можно начинать паниковать
                <Typist.Delay ms={1000} />
                <br/>
                Серьёзно, напиши уже кому-нибудь
                <Typist.Delay ms={1000} />
                <br/>
                Кажется что то не так😑
            </Typist>
        </Typography.XLarge>
    </Box>
);

export default withTheme(TextLoader);