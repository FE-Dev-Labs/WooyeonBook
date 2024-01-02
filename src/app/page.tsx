import { cookies, headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function Home() {
	const signIn = async (formData: FormData) => {
		'use server';

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect('/?message=Could not authenticate user');
		}

		return redirect('/');
	};

	const signUp = async (formData: FormData) => {
		'use server';

		const origin = headers().get('origin');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			return redirect('/?message=Could not authenticate user');
		}

		return redirect('/?message=Check email to continue sign in process');
	};

	const signOut = async () => {
		'use server';

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		await supabase.auth.signOut();
		return redirect('/');
	};

	return (
		<main>
			<form action={signIn}>
				<input type="email" name="email" placeholder="Email" required />
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
				/>
				<button formAction={signIn}>Sign In</button>
			</form>
			<form action={signUp}>
				<input type="email" name="email" placeholder="Email" required />
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
				/>
				<button formAction={signUp}>Sign Up</button>
			</form>
			<form action={signOut}>
				<button type="submit">Sign Out</button>
			</form>
		</main>
	);
}
