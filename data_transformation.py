import pandas as pd
import numpy as np

def transform_jumbo_data(input_csv='eind_data-1-in.csv', output_csv='products_FINAL_WORKING_CLEANED.csv'):
    """
    Transformeert de ruwe Jumbo scrape data naar een schone, gestructureerde dataset.

    Parameters:
    -----------
    input_csv : str
        Pad naar het input CSV bestand met ruwe scrape data
    output_csv : str
        Pad waar het getransformeerde CSV bestand opgeslagen wordt

    Returns:
    --------
    pd.DataFrame
        Het getransformeerde dataframe
    """

    print("=== STAP 1: Data Inlezen ===")
    # Lees de input CSV met error handling voor problematische lijnen
    try:
        df = pd.read_csv(input_csv, encoding='utf-8', on_bad_lines='skip', low_memory=False)
    except:
        df = pd.read_csv(input_csv, encoding='latin1', on_bad_lines='skip', low_memory=False)

    print(f"Data ingelezen: {len(df)} rijen, {len(df.columns)} kolommen")

    print("\n=== STAP 2: Kolommen Hernoemen ===")
    # Hernoem kolommen voor consistentie (vervang spaties door underscores indien nodig)
    column_mapping = {
        'categorie_url': 'categorie_url',
        'product_foto_url': 'product_foto_url', 
        'product_url': 'product_url'
    }

    # Controleer of kolommen al correct zijn
    if 'categorie_url' not in df.columns and 'categorieurl' in df.columns:
        df = df.rename(columns={'categorieurl': 'categorie_url'})
    if 'product_foto_url' not in df.columns and 'productfotourl' in df.columns:
        df = df.rename(columns={'productfotourl': 'product_foto_url'})
    if 'product_url' not in df.columns and 'producturl' in df.columns:
        df = df.rename(columns={'producturl': 'product_url'})

    print("\n=== STAP 3: Data Cleaning - Prijzen ===")
    # Maak een nieuwe kolom voor cleaned prices
    def clean_price(price_str):
        """
        Converteert prijsstrings naar floats.
        Voorbeelden:
        - "3,99" -> 3.99
        - "1,50" -> 1.50
        - None/NaN blijft NaN
        """
        if pd.isna(price_str):
            return np.nan

        try:
            # Converteer naar string en strip whitespace
            price_str = str(price_str).strip()

            # Vervang komma door punt voor decimal separator
            price_str = price_str.replace(',', '.')

            # Verwijder dubbele aanhalingstekens indien aanwezig
            price_str = price_str.replace('"', '')

            # Converteer naar float
            return float(price_str)
        except (ValueError, AttributeError):
            return np.nan

    # Pas price cleaning toe
    df['productprijs_clean'] = df['productprijs'].apply(clean_price)

    print(f"Prijzen gecleaned: {df['productprijs_clean'].notna().sum()} van {len(df)} producten")
    print(f"Missing prijzen: {df['productprijs_clean'].isna().sum()}")

    print("\n=== STAP 4: Data Type Conversies ===")
    # Zorg ervoor dat string kolommen daadwerkelijk strings zijn
    string_columns = ['supermarkt', 'categorie', 'categorie_url', 'productnaam', 
                     'productprijs', 'productprijs_per_unit', 'product_foto_url', 'product_url']

    for col in string_columns:
        if col in df.columns:
            df[col] = df[col].astype(str)

    print("\n=== STAP 5: Verwijderen Overbodige Kolommen ===")
    # Verwijder de 'Unnamed' kolommen indien aanwezig
    unnamed_cols = [col for col in df.columns if 'Unnamed' in col or 'unnamed' in col]
    if unnamed_cols:
        df = df.drop(columns=unnamed_cols)
        print(f"Verwijderde kolommen: {unnamed_cols}")

    print("\n=== STAP 6: Duplicaten Verwijderen ===")
    initial_count = len(df)
    df = df.drop_duplicates(subset=['supermarkt', 'productnaam', 'productprijs'], keep='first')
    removed_duplicates = initial_count - len(df)
    print(f"Duplicaten verwijderd: {removed_duplicates}")

    print("\n=== STAP 7: Delimiter Aanpassen ===")
    # Sla op met semicolon delimiter (zoals in de finale versie)
    df.to_csv(output_csv, index=False, sep=';', encoding='utf-8')
    print(f"\nOutput opgeslagen naar: {output_csv}")

    print("\n=== TRANSFORMATIE COMPLEET ===")
    print(f"Totaal producten in output: {len(df)}")
    print(f"Kolommen: {df.columns.tolist()}")

    # Print statistieken
    print("\n=== STATISTIEKEN ===")
    print(f"Gemiddelde prijs: €{df['productprijs_clean'].mean():.2f}")
    print(f"Mediaan prijs: €{df['productprijs_clean'].median():.2f}")
    print(f"Min prijs: €{df['productprijs_clean'].min():.2f}")
    print(f"Max prijs: €{df['productprijs_clean'].max():.2f}")
    print(f"\nAantal supermarkten: {df['supermarkt'].nunique()}")
    print(f"Supermarkten: {df['supermarkt'].unique().tolist()}")
    print(f"\nAantal categorieën: {df['categorie'].nunique()}")

    return df

# Voer transformatie uit
if __name__ == "__main__":
    df_transformed = transform_jumbo_data()

    # Optioneel: Toon voorbeelddata
    print("\n=== VOORBEELD DATA (eerste 5 rijen) ===")
    print(df_transformed.head())
