// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import {
	createClient,
	SupabaseClient
} from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { verifyKey } from 'https://esm.sh/@unkey/api';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, content-type, x-api-key',
	'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
};

async function getRoom(supabaseClient: SupabaseClient, id: string) {
	const { data, error } = await supabaseClient
		.from('rooms')
		.select('id')
		.eq('room_id', id)
		.eq('is_active', true);
	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 500
		});
	}

	if (data.length === 0) {
		return new Response(JSON.stringify({ error: 'Room not found' }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 404
		});
	}

	return new Response(JSON.stringify({ _: true }), {
		headers: { ...corsHeaders, 'Content-Type': 'application/json' },
		status: 200
	});
}

async function updateRoom(supabaseClient: SupabaseClient, id: string) {
	const { error } = await supabaseClient
		.from('rooms')
		.update({ is_active: false })
		.eq('room_id', id);
	if (error)
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 500
		});

	return new Response(JSON.stringify({ _: true }), {
		headers: { ...corsHeaders, 'Content-Type': 'application/json' },
		status: 200
	});
}

async function createRoom(supabaseClient: SupabaseClient) {
	const room_id = Math.random().toString(36).substring(2, 7);
	const { data, error } = await supabaseClient
		.from('rooms')
		.insert([{ room_id }])
		.select();
	if (error)
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 500
		});

	return new Response(JSON.stringify({ data: data[0] }), {
		headers: { ...corsHeaders, 'Content-Type': 'application/json' },
		status: 200
	});
}

Deno.serve(async (req) => {
	const { url, method, headers } = req;

	// This is needed if you're planning to invoke your function from a browser.
	if (method === 'OPTIONS') {
		return new Response('OK', { headers: corsHeaders });
	}

	const error = await verifyUnkeyApi(headers);
	if (error) return error;

	// Create a Supabase client with the Auth context of the logged in user.
	const supabaseClient = createClient(
		// Supabase API URL - env var exported by default.
		Deno.env.get('SUPABASE_URL') ?? '',
		// Supabase API ANON KEY - env var exported by default.
		Deno.env.get('SUPABASE_ANON_KEY') ?? '',
		// Create client with Auth context of the user that called the function.
		// This way your row-level-security (RLS) policies are applied.
		{
			global: {
				headers: { Authorization: req.headers.get('Authorization')! }
			}
		}
	);

	const taskPattern = new URLPattern({ pathname: '/room/:id' });
	const matchingPath = taskPattern.exec(url);
	const id = matchingPath ? matchingPath.pathname.groups.id : null;

	// let data = null;
	// if (method === 'POST' || method === 'PUT') {
	// 	const body = await req.json();
	// 	data = body.data;
	// }

	// call relevant method based on method and id
	switch (true) {
		case id && method === 'GET':
			return getRoom(supabaseClient, id as string);
		case id && method === 'PUT':
			return updateRoom(supabaseClient, id as string);
		case method === 'POST':
			return createRoom(supabaseClient);
		default:
			return new Response(JSON.stringify({ message: 'Not Found' }), {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 404
			});
	}
});

async function verifyUnkeyApi(headers: Headers) {
	const key = headers.get('x-api-key') as string;
	if (!key)
		return new Response(JSON.stringify({ message: 'Unauthorized Access' }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 401
		});
	const { result, error } = await verifyKey(key);
	if (error) {
		return new Response(
			JSON.stringify({ message: 'Error verifying API key' }),
			{
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 500
			}
		);
	}
	if (!result.valid) {
		return new Response(JSON.stringify({ message: 'Unauthorized Access' }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 401
		});
	}

	return null;
}
