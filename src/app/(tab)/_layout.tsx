// src/app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { House, InfoIcon, User } from "lucide-react";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <House />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: () => <User /> }}
      />
      <Tabs.Screen
        name="about"
        options={{ title: "About", tabBarIcon: () => <InfoIcon /> }}
      />
    </Tabs>
  );
}
