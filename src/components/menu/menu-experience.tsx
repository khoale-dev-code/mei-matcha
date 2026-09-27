"use client";

import { Leaf, Search, Sparkles } from "lucide-react";
import { useState } from "react";

import {
  defaultSweetness,
  menuItems,
  milkOptions,
  sweetnessOptions,
  toppingOptions,
} from "@/data/menu";
import type { MenuCategoryId, MenuItem } from "@/types/menu";

import styles from "./menu-experience.module.css";

type CategoryFilter = MenuCategoryId | "all" | "options";

const categoryLabels: ReadonlyArray<{
  id: CategoryFilter;
  label: string;
}> = [
  { id: "all", label: "Tất cả" },
  { id: "premium", label: "Premium" },
  { id: "classic", label: "Classic" },
  { id: "hojicha", label: "Hojicha" },
  { id: "fusion", label: "Fusion" },
  { id: "options", label: "Tùy chọn" },
];

const premiumFeaturedHouses = new Set([
  "Shogyokuen",
  "Atami Tea",
  "Yamamasa Koyamaen",
]);

const premiumHouseOrder = ["Waba Tea", "Marukyu Koyamaen", "Ishimoto"] as const;

function formatBoardPrice(value: number | null) {
  if (value === null) return "—";
  return String(Math.round(value / 1000));
}

function optionSurchargeLabel(value: number) {
  return value === 0 ? "Mặc định" : `+${Math.round(value / 1000)}`;
}

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

export function MenuExperience() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeText(query);

  function itemMatches(item: MenuItem) {
    if (!normalizedQuery) return true;

    return normalizeText(
      [
        item.name,
        item.house ?? "",
        item.description ?? "",
        ...(item.badges ?? []),
      ].join(" "),
    ).includes(normalizedQuery);
  }

  function categoryVisible(category: MenuCategoryId) {
    return activeCategory === "all" || activeCategory === category;
  }

  function itemsFor(category: MenuCategoryId) {
    if (!categoryVisible(category)) return [];

    return menuItems.filter(
      (item) => item.category === category && itemMatches(item),
    );
  }

  const premiumItems = itemsFor("premium");
  const classicItems = itemsFor("classic");
  const hojichaItems = itemsFor("hojicha");
  const fusionItems = itemsFor("fusion");

  const optionsVisible =
    activeCategory === "all" ||
    activeCategory === "classic" ||
    activeCategory === "hojicha" ||
    activeCategory === "options";

  const visibleBoardColumnCount = [
    activeCategory === "all" || activeCategory === "premium",
    activeCategory === "all" ||
      activeCategory === "classic" ||
      activeCategory === "hojicha" ||
      activeCategory === "options",
    activeCategory === "all" || activeCategory === "fusion",
  ].filter(Boolean).length;

  const totalVisibleItems =
    premiumItems.length +
    classicItems.length +
    hojichaItems.length +
    fusionItems.length;

  return (
    <section className={styles.page} aria-labelledby="menu-title">
      <header className={styles.menuIntro}>
        <div className={styles.titleBlock}>
          <p className={styles.kicker}>MIE MATCHA</p>
          <h1 id="menu-title">Menu nhà Mie</h1>
          <p className={styles.subtitle}>Chọn vị trà, thêm chút gu riêng.</p>
        </div>

        <div className={styles.menuTools}>
          <label className={styles.searchBox}>
            <Search size={20} aria-hidden="true" />
            <span className={styles.srOnly}>Tìm món</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm món..."
              type="search"
            />
          </label>

          <p className={styles.priceNote}>
            Giá tính theo nghìn đồng
            <span>·</span>
            M 360 ml
            <span>·</span>
            L 500 ml
          </p>
        </div>
      </header>

      <nav className={styles.categoryNav} aria-label="Danh mục menu">
        {categoryLabels.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={activeCategory === category.id}
            className={
              activeCategory === category.id
                ? styles.categoryActive
                : styles.categoryButton
            }
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </nav>

      <div
        className={styles.menuBoard}
        data-columns={visibleBoardColumnCount}
        id="menu-board"
      >
        {activeCategory === "all" || activeCategory === "premium" ? (
          <section className={styles.boardColumn} aria-labelledby="premium-title">
            <SectionTitle
              id="premium-title"
              title="Premium / Ceremonial"
              note="Cold-whisk +5"
            />

            <div className={styles.premiumFeatured}>
              {premiumItems
                .filter((item) =>
                  item.house ? premiumFeaturedHouses.has(item.house) : false,
                )
                .map((item) => (
                  <MenuRow key={item.id} item={item} showHouse />
                ))}
            </div>

            {premiumHouseOrder.map((house) => {
              const items = premiumItems.filter((item) => item.house === house);
              if (!items.length) return null;

              return (
                <div key={house} className={styles.houseGroup}>
                  <h3>{house}</h3>
                  {items.map((item) => (
                    <MenuRow key={item.id} item={item} />
                  ))}
                </div>
              );
            })}
          </section>
        ) : null}

        {activeCategory === "all" ||
        activeCategory === "classic" ||
        activeCategory === "hojicha" ||
        activeCategory === "options" ? (
          <section className={styles.boardColumn} aria-label="Classic và Hojicha">
            {(activeCategory === "all" || activeCategory === "classic") &&
            classicItems.length ? (
              <div className={styles.menuSection}>
                <SectionTitle id="classic-title" title="Classic" />
                {classicItems.map((item) => (
                  <MenuRow key={item.id} item={item} />
                ))}
              </div>
            ) : null}

            {(activeCategory === "all" || activeCategory === "hojicha") &&
            hojichaItems.length ? (
              <div className={styles.menuSection}>
                <SectionTitle id="hojicha-title" title="Hojicha" />
                {hojichaItems.map((item) => (
                  <MenuRow key={item.id} item={item} />
                ))}
              </div>
            ) : null}

            {optionsVisible ? <OptionsCard /> : null}
          </section>
        ) : null}

        {activeCategory === "all" || activeCategory === "fusion" ? (
          <section className={styles.boardColumn} aria-labelledby="fusion-title">
            <SectionTitle id="fusion-title" title="Fusion" />

            <div className={styles.fusionList}>
              {fusionItems.map((item) => (
                <MenuRow key={item.id} item={item} showDescription />
              ))}
            </div>

            <div className={styles.fusionExtra}>Baileys cheesefoam +8</div>
          </section>
        ) : null}
      </div>

      {normalizedQuery && totalVisibleItems === 0 ? (
        <div className={styles.emptySearch}>
          <Sparkles size={20} aria-hidden="true" />
          <strong>Chưa tìm thấy món phù hợp.</strong>
          <p>Thử tên món, nhà trà hoặc nhóm vị khác.</p>
        </div>
      ) : null}

      <div className={styles.boardFooter}>
        <div>
          <strong>mie matcha</strong>
          <span>Một chút matcha, một ngày dịu hơn.</span>
        </div>
        <a href="#menu-title">Lên đầu trang</a>
      </div>
    </section>
  );
}

function SectionTitle({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note?: string;
}) {
  return (
    <header className={styles.sectionTitle}>
      <div>
        <h2 id={id}>{title}</h2>
        {note ? <p>{note}</p> : null}
      </div>

      <div className={styles.sizeLegend} aria-label="Kích thước ly">
        <div>
          <span>M</span>
          <small>360 ml</small>
        </div>
        <div>
          <span>L</span>
          <small>500 ml</small>
        </div>
      </div>
    </header>
  );
}

function MenuRow({
  item,
  showHouse = false,
  showDescription = false,
}: {
  item: MenuItem;
  showHouse?: boolean;
  showDescription?: boolean;
}) {
  return (
    <article className={styles.menuRow}>
      <span className={styles.rowLeaf}>
        <Leaf size={16} aria-hidden="true" />
      </span>

      <span className={styles.rowCopy}>
        <strong>
          {item.name}
          {item.badges?.includes("Có cồn") ? (
            <em className={styles.alcoholBadge}>Có cồn</em>
          ) : null}
        </strong>

        {showHouse && item.house ? <small>{item.house}</small> : null}
        {showDescription && item.description ? (
          <small>{item.description}</small>
        ) : null}
      </span>

      <span className={styles.rowPrices} aria-label={`Giá ${item.name}`}>
        <strong>{formatBoardPrice(item.prices.M)}</strong>
        <strong>{formatBoardPrice(item.prices.L)}</strong>
      </span>
    </article>
  );
}

function OptionsCard() {
  return (
    <section className={styles.optionsCard} aria-labelledby="options-title">
      <div className={styles.optionsHeading}>
        <Leaf size={19} aria-hidden="true" />
        <h2 id="options-title">Pha theo gu bạn</h2>
      </div>

      <div className={styles.optionPreviewBlock}>
        <h3>Loại sữa</h3>
        <ul>
          {milkOptions.map((option) => (
            <li key={option.id}>
              <span>{option.label.replace("Sữa ", "")}</span>
              <strong>{optionSurchargeLabel(option.surcharge)}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.optionPreviewBlock}>
        <h3>Độ ngọt</h3>
        <div className={styles.sweetnessPreview}>
          {sweetnessOptions.map((value) => (
            <span
              key={value}
              className={
                value === defaultSweetness
                  ? styles.sweetnessPreviewActive
                  : undefined
              }
            >
              {value}%
            </span>
          ))}
        </div>
        <p>Mặc định: {defaultSweetness}%</p>
      </div>

      <div className={styles.optionPreviewBlock}>
        <h3>Topping</h3>
        <ul>
          {toppingOptions.map((option) => (
            <li key={option.id}>
              <span>{option.label.replace(" cake", "")}</span>
              <strong>+{Math.round(option.surcharge / 1000)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
