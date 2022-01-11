using System;
using System.Security.Cryptography;

namespace Helpers
{
	public static class PasswordHasher
	{
		private const int SaltSize = 16;
		private const int HashSize = 20;
		private const int Iterations = 10000;

		public static string Hash(string password)
		{
			byte[] salt = new byte[SaltSize];
			new RNGCryptoServiceProvider().GetBytes(salt);

			var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations);
			byte[] hash = pbkdf2.GetBytes(20);

			var hashBytes = new byte[SaltSize + HashSize];
			Array.Copy(salt, 0, hashBytes, 0, SaltSize);
			Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

			var base64Hash = Convert.ToBase64String(hashBytes);

			return base64Hash;
		}

		public static bool Verify(string password, string hashedPassword)
		{
			byte[] hashBytes = Convert.FromBase64String(hashedPassword);

			byte[] salt = new byte[SaltSize];
			Array.Copy(hashBytes, 0, salt, 0, SaltSize);

			var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations);
			byte[] hash = pbkdf2.GetBytes(HashSize);

			for (int i = 0; i < HashSize; i++)
			{
				if (hashBytes[i + SaltSize] != hash[i])
				{
					return false;
				}
			}

			return true;
		}
	}
}