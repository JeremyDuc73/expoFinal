// import {
//   Text,
//   VStack,
//   FormControl,
//   Box,
//   FormControlLabel,
//   FormControlLabelText,
//   ButtonText, Button, LinkText
// } from "@gluestack-ui/themed";
// import {useState} from "react";
// import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
// import {TextInput} from "@/components/TextInput";
// import {Link, router} from "expo-router";
// import axios from "axios";
//
//
// type FormValues = {
//   username: string;
//   email: string;
//   password: string;
// };
//
// export default function Register() {
//   const {...methods} = useForm({mode: 'onChange'});
//   const onSubmit: SubmitHandler<FormValues> = (formDatas) => {
//     const url = "https://messenger.dlfcaroline.online/register"
//     axios.post(url, formDatas)
//         .then((response)=>{
//           console.log(response.data)
//         })
//     router.replace('/login')
//   };
//
//   const [formError, setError] = useState<Boolean>(false)
//   const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
//     return console.log({errors})
//   }
//
//
//   return (
//       <VStack p='$4'>
//         { formError ? <VStack><Text style={{color: 'red'}}>There was a problem with loading the form. Please try again later.</Text></VStack> :
//             <>
//             <FormProvider {...methods}>
//               <VStack space='xl'>
//               <FormControl isRequired={true}>
//                 <FormControlLabel>
//                   <FormControlLabelText>Username</FormControlLabelText>
//                 </FormControlLabel>
//                   <TextInput
//                       label=""
//                       name="username"
//                       rules={{ required: 'Username is required!' }}
//                       setFormError={setError}
//                   />
//               </FormControl>
//               <FormControl isRequired={true}>
//                 <FormControlLabel>
//                   <FormControlLabelText>Email</FormControlLabelText>
//                 </FormControlLabel>
//                   <TextInput
//                       label=""
//                       name="email"
//                       keyboardType="email-address"
//                       rules={{
//                         required: 'Email is required!',
//                         pattern: {
//                           value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
//                           message: 'Must be formatted: example@email.com',
//                         },
//                       }}
//                       setFormError={setError}
//                   />
//               </FormControl>
//               <Box>
//                 <FormControl isRequired={true} >
//                   <FormControlLabel>
//                     <FormControlLabelText>Password</FormControlLabelText>
//                   </FormControlLabel>
//                     <TextInput
//                         label=""
//                         name="password"
//                         rules={{required: "Password is required !"}}
//                         setFormError = {setError}
//                     />
//                 </FormControl>
//               </Box>
//               <VStack>
//                 <Button onPress={methods.handleSubmit(onSubmit)} size="lg" action="positive">
//                   <ButtonText>Register</ButtonText>
//                 </Button>
//               </VStack>
//             </VStack>
//             </FormProvider>
//             </>
//         }
//         <VStack mt='$5'>
//           <Text>Already have an acoount?</Text>
//           <Link href="/login">
//             <LinkText>Log in here</LinkText>
//           </Link>
//         </VStack>
//       </VStack>
//   );
// }
