import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { allProducts, getFamily } from "./products";

describe("Confirmed chemical classifications", () => {
  const rules = [
    ["lavida-73wdg", "fungicides", "Mancozeb 680g/Kg + Cymoxanil 50g/Kg", "Dithiocarbamate + Cyanoacetamide oxime"],
    ["samurai", "fungicides", "Metalaxyl 8% + Mancozeb 64%", "Phenylamide (acylalanine) + Dithiocarbamate"],
    ["headlines", "fungicides", "Thiophanate-methyl 700g/Kg", "Thiourea / Benzimidazole precursor"],
    ["esteem", "fungicides", "Azoxystrobin 500g/kg", "Strobilurin"],
    ["efosite", "fungicides", "Fosetyl-aluminium 800g/kg", "Phosphonate"],
    ["vagan-50sc", "insecticides", "Fipronil 50 g/L", "Phenylpyrazole"],
    ["expel", "public-health", "Fipronil 30g/L", "Phenylpyrazole"],
  ];
  for (const [slug, family, activeIngredient, classification] of rules) {
    test(`${slug} uses its confirmed ingredient and family`, () => {
      const product = allProducts.find((item) => item.slug === slug);
      assert.deepEqual({ familySlug: product?.familySlug, activeIngredient: product?.activeIngredient, classification: product?.classification }, { familySlug: family, activeIngredient, classification });
    });
  }
  test("Fungicides contains 11 products", () => {
    assert.equal(getFamily("fungicides")?.products.length, 11);
  });
  test("Equipment has two separately pictured sprayers", () => {
    assert.deepEqual(getFamily("knapsack-sprayers")?.products.map((product) => product.image), ["/products/orbit-hymatic.png", "/products/orbit-jacto.png"]);
  });
});