import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { wallet, tx_sig, license_type } = req.body;

    if (!wallet || !tx_sig) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const SECRET_KEY = process.env.SECRET_KEY || "CHANGE_ME_SUPER_SECRET_256_BITS";
    const heliusKey = process.env.HELIUS_API_KEY;

    // Ici, tu pourras plus tard ajouter la vérification réelle de la transaction via Helius

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const token = jwt.sign(
      { wallet, license_type, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 },
      SECRET_KEY
    );

    return res.status(200).json({
      status: "ok",
      wallet,
      tx_sig,
      license_type,
      expires_at: expiresAt,
      jwt: token,
    });
  } catch (err) {
    console.error("Erreur:", err);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
}

