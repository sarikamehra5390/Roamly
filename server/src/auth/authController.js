import supabase from "../config/supabase.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // 2. Create account using Supabase Auth
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Supabase Auth error:", authError.message);

      return res.status(400).json({
        message: authError.message,
      });
    }

    // 3. Create Roamly user profile
    const { data: profile, error: profileError } =
      await supabase
        .from("users")
        .insert({
          auth_user_id: authData.user.id,
          name,
          email,
        })
        .select()
        .single();

    if (profileError) {
      console.error(
        "Profile creation error:",
        profileError.message
      );

      // Remove auth account if profile creation fails
      await supabase.auth.admin.deleteUser(
        authData.user.id
      );

      return res.status(500).json({
        message: "Failed to create user profile",
      });
    }

    // 4. Send response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: profile.id,
        authUserId: profile.auth_user_id,
        name: profile.name,
        email: profile.email,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong during registration",
    });
  }
};