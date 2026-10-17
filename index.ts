import { generateText } from 'ai';

// Safely load .env.local or .env if running standalone
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('.env.local');
  } catch {
    try {
      process.loadEnvFile('.env');
    } catch {
      // Ignored if already loaded or not present
    }
  }
}

async function main() {
  console.log('Calling Vercel AI Gateway with moonshotai/kimi-k3...');
  try {
    const { text } = await generateText({
      model: 'moonshotai/kimi-k3',
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    console.log('\n--- Generated Holiday (moonshotai/kimi-k3) ---');
    console.log(text);
  } catch (err: any) {
    console.error('\nResult for moonshotai/kimi-k3:');
    console.error(err.message || err);

    // If account doesn't have paid credits for kimi-k3, verify gateway setup with free-tier accessible kimi-k2
    if (err.message?.includes('Free tier users do not have access to this model')) {
      console.log('\n[Gateway Verified]: Vercel AI Gateway key is valid and authenticated.');
      console.log('Testing free-tier model moonshotai/kimi-k2 through Vercel AI Gateway to verify full pipeline...');
      const { text: k2Text } = await generateText({
        model: 'moonshotai/kimi-k2',
        prompt: 'Invent a new holiday and describe its traditions.',
      });

      console.log('\n--- Generated Holiday (via moonshotai/kimi-k2 on Vercel AI Gateway) ---');
      console.log(k2Text);
    } else {
      throw err;
    }
  }
}

main().catch((err) => {
  console.error('Error running example:', err);
  process.exit(1);
});
