import React from "react";
import { Flex } from 'rebass';
import { withTheme } from "styled-components";
import { MoonLoader } from "react-spinners";

import { Typography } from "../index";


const InfinityLoader =({theme, done}) => (
    <Flex justifyContent={"center"} my={"40px"}>
        {
            done
                ? <Typography.Normal textTransform={"lowercase"} margin={"auto"}>🙆‍♂️ на этом всё 🙅‍♂️</Typography.Normal>
                : <MoonLoader color={theme.colors.primary} size={20}/>
        }
    </Flex>
);

export default withTheme(InfinityLoader);