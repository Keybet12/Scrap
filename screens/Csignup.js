// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";

// export default function CollectorSignUp({ navigation }) {
//   const [fullName, setFullName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [phone, setPhone] = React.useState("");
//   // const [role, setRole] = React.useState("");
//   const [location, setLocation] = React.useState("");
//   const [center, setScrapCenter] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [confirmPassword, setConfirmPassword] = React.useState("");
//   const [isPasswordVisible, setPasswordVisible] = React.useState(false);
//   const [isConfirmVisible, setConfirmVisible] = React.useState(false);

//   const isStrongPassword = (pwd) =>
//     pwd.length >= 8 &&
//     /[A-Z]/.test(pwd) &&
//     /[a-z]/.test(pwd) &&
//     /[0-9]/.test(pwd) &&
//     /[!@#\$%^&\*]/.test(pwd);

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isValidPhone = (phone) =>
//     /^\d{10}$/.test(phone);

//   const onRegister = () => {
//     if (!fullName || !email || !phone || !role || !location || !center || !password || !confirmPassword) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert("Invalid Email", "Please enter a valid email address.");
//       return;
//     }

//     if (!isValidPhone(phone)) {
//       Alert.alert("Invalid Phone Number", "Phone number must be exactly 10 digits.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match.");
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       Alert.alert(
//         "Weak Password",
//         "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     }

//     navigation.navigate("CLogin");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.loginBox}>
//         <Text style={styles.heading}>SCRAP CONNECT</Text>
//         <Text style={styles.welcome}>Create a new account</Text>

//         <TextInput
//           placeholder="Full Name"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           value={fullName}
//           onChangeText={setFullName}
//         />

//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//         />

//         <TextInput
//           placeholder="Phone Number"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           keyboardType="number-pad"
//           maxLength={10}
//           value={phone}
//           onChangeText={setPhone}
//         />

//          <TextInput
//           placeholder="Location"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           value={location}
//           onChangeText={setLocation}
//         />

//          <TextInput
//           placeholder="Scrap Center"
//           placeholderTextColor="#ccc"
//           style={styles.input}
//           value={center}
//           onChangeText={setScrapCenter}
//          />

//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#ccc"
//             style={styles.passwordInput}
//             secureTextEntry={!isPasswordVisible}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setPasswordVisible(!isPasswordVisible)}
//             style={styles.eyeIcon}
//           >
//             <Ionicons
//               name={isPasswordVisible ? "eye-off" : "eye"}
//               size={24}
//               color="#ccc"
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Confirm Password"
//             placeholderTextColor="#ccc"
//             style={styles.passwordInput}
//             secureTextEntry={!isConfirmVisible}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <TouchableOpacity
//             onPress={() => setConfirmVisible(!isConfirmVisible)}
//             style={styles.eyeIcon}
//           >
//             <Ionicons
//               name={isConfirmVisible ? "eye-off" : "eye"}
//               size={24}
//               color="#ccc"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Role Picker */}
//         {/* <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={role}
//             onValueChange={(itemValue) => setRole(itemValue)}
//             style={styles.picker}
//             dropdownIconColor="#ccc"
//             mode="dropdown"
//           >
//             <Picker.Item label="Select Your Role" value="" color="#ccc" />
//             <Picker.Item label="Scrap Collector" value="collector" color="#000" />
//             <Picker.Item label="Home Owner" value="homeowner" color="#000" />
//             <Picker.Item label="Admin" value="admin" color="#000" />
//           </Picker>
//         </View> */}

//         <TouchableOpacity style={styles.signInButton} onPress={onRegister}>
//           <Text style={styles.signInButtonText}>Register</Text>
//         </TouchableOpacity>

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => navigation.navigate("Clogin")}>
//             <Text style={styles.linkText}>Already have an account?</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const DARK_GREEN = "#004225";
// const GREEN = "#3CB371";
// const WHITE = "#FFFFFF";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: DARK_GREEN,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loginBox: {
//     width: "85%",
//     backgroundColor: "#013220",
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: GREEN,
//     padding: 25,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: WHITE,
//     textAlign: "center",
//   },
//   welcome: {
//     fontSize: 18,
//     fontStyle: "italic",
//     color: WHITE,
//     textAlign: "center",
//     marginVertical: 15,
//   },
//   input: {
//     backgroundColor: "#014d33",
//     color: WHITE,
//     borderRadius: 6,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   passwordContainer: {
//     position: "relative",
//     marginBottom: 15,
//   },
//   passwordInput: {
//     backgroundColor: "#014d33",
//     color: WHITE,
//     borderRadius: 6,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     paddingRight: 45,
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: 15,
//     top: 12,
//   },
//   // pickerContainer: {
//   //   backgroundColor: "#014d33",
//   //   borderRadius: 6,
//   //   marginBottom: 15,
//   //   overflow: "hidden",
//   // },
//   // picker: {
//   //   color: "#fff",
//   //   fontSize: 16,
//   //   paddingVertical: Platform.OS === "android" ? 10 : 12,
//   //   paddingHorizontal: 15,
//   //   backgroundColor: "#014d33",
//   // },
//   signInButton: {
//     backgroundColor: GREEN,
//     borderRadius: 6,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginTop: 5,
//   },
//   signInButtonText: {
//     color: WHITE,
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   linksContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   linkText: {
//     color: WHITE,
//     textDecorationLine: "underline",
//     fontSize: 16,
//   },
// });

//gmni
// screens/Csignup.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function CollectorSignUp({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [center, setScrapCenter] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isStrongPassword = pwd =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[0-9]/.test(pwd) &&
    /[!@#\$%^&\*]/.test(pwd);

  const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone = p => /^\d{10}$/.test(p);

  const onRegister = async () => {
    if (
      !fullName ||
      !username ||
      !email ||
      !phone ||
      !center ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      Alert.alert("Invalid Phone Number", "Phone number must be exactly 10 digits.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (!isStrongPassword(password)) {
      Alert.alert(
        "Weak Password",
        "Must be at least 8 chars with upper, lower, number & special."
      );
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://scrapconnect.loca.lt/api/v1/collector/signup/",
        {
          fullName,
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          phoneNo: phone,
          password,
          centerUsername: center.trim(),
        },
        {
          headers: {
            "Bypass-Tunnel-Reminder": "1", // Important for localtunnel
            "Content-Type": "application/json"
          }
        }
      );
      Alert.alert("Success", data.message || "Registered successfully!");
      navigation.navigate("Clogin");
    } catch (err) {
      console.error("Collector Signup Error:", err);
      const msg = err.response?.data?.message || err.message || "Registration failed.";
      Alert.alert("Registration Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>SCRAP CONNECT</Text>
        <Text style={styles.welcome}>Create a new account</Text>

        {/* Fields */}
        {[
          { label: "Full Name", value: fullName, setter: setFullName },
          { label: "Username", value: username, setter: setUsername, props: { autoCapitalize: "none" } },
          {
            label: "Email",
            value: email,
            setter: setEmail,
            props: { keyboardType: "email-address", autoCapitalize: "none" },
          },
          {
            label: "Phone Number",
            value: phone,
            setter: setPhone,
            props: { keyboardType: "number-pad", maxLength: 10 },
          },
          {
            label: "Location",
            value: location,
            setter: setLocation,
          },
          {
            label: "Scrap Center Username",
            value: center,
            setter: setScrapCenter,
          },
        ].map(({ label, value, setter, props }, i) => (
          <TextInput
            key={i}
            placeholder={label}
            placeholderTextColor="#ccc"
            style={styles.input}
            value={value}
            onChangeText={setter}
            {...props}
          />
        ))}

        {/* Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(v => !v)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!isConfirmVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmVisible(v => !v)}
          >
            <Ionicons
              name={isConfirmVisible ? "eye-off" : "eye"}
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={onRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signInButtonText}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Clogin")}>
            <Text style={styles.linkText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const DARK_GREEN = "#004225";
const GREEN = "#3CB371";
const WHITE = "#FFFFFF";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK_GREEN, justifyContent: "center", alignItems: "center" },
  loginBox: {
    width: "85%",
    backgroundColor: "#013220",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GREEN,
    padding: 25,
  },
  heading: { fontSize: 28, fontWeight: "bold", color: WHITE, textAlign: "center" },
  welcome: { fontSize: 18, fontStyle: "italic", color: WHITE, textAlign: "center", marginVertical: 15 },
  input: {
    backgroundColor: "#014d33",
    color: WHITE,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: { position: "relative", marginBottom: 15 },
  passwordInput: {
    backgroundColor: "#014d33",
    color: WHITE,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    paddingRight: 45,
  },
  eyeIcon: { position: "absolute", right: 15, top: 12 },
  signInButton: { backgroundColor: GREEN, borderRadius: 6, paddingVertical: 15, alignItems: "center", marginTop: 5 },
  signInButtonText: { color: WHITE, fontWeight: "600", fontSize: 18 },
  linksContainer: { marginTop: 20, alignItems: "center" },
  linkText: { color: WHITE, textDecorationLine: "underline", fontSize: 16 },
});


//gpt
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const Csignup = () => {
//   const navigation = useNavigation();

//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [center, setCenter] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
//   const isValidPhone = (phone) => /^\d{10}$/.test(phone);
//   const isStrongPassword = (password) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password);

//   const onRegister = async () => {
//     if (
//       !fullName ||
//       !username ||
//       !email ||
//       !phone ||
//       !location ||
//       !center ||
//       !password ||
//       !confirmPassword
//     ) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert("Invalid Email", "Please enter a valid email address.");
//       return;
//     }

//     if (!isValidPhone(phone)) {
//       Alert.alert("Invalid Phone Number", "Phone number must be exactly 10 digits.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match.");
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       Alert.alert(
//         "Weak Password",
//         "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     }

//     try {
//       const response = await fetch("http://YOUR-IP:5000/api/v1/collector/signup/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName,
//           username,
//           email,
//           phoneNo: phone,
//           password,
//           centerUsername: center,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "Account created successfully!");
//         navigation.navigate("CLogin");
//       } else {
//         Alert.alert("Signup Failed", data.message || "Please try again.");
//       }
//     } catch (error) {
//       Alert.alert("Network Error", "Could not connect to server.");
//       console.error("Signup error:", error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Collector Sign Up</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         placeholderTextColor="#999"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="#999"
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#999"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         placeholderTextColor="#999"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Location"
//         placeholderTextColor="#999"
//         value={location}
//         onChangeText={setLocation}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Scrap Collection Center Username"
//         placeholderTextColor="#999"
//         value={center}
//         onChangeText={setCenter}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />

//       <TouchableOpacity style={styles.button} onPress={onRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("CLogin")}>
//         <Text style={styles.linkText}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default Csignup;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#2e7d32",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#2e7d32",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   linkText: {
// //     marginTop: 15,
// //     color: "#2e7d32",
// //     textAlign: "center",
// //     textDecorationLine: "underline",
// //   },
// // });
