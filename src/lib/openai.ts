// Mock AI Library - Using placeholder data instead of actual API calls

// Mock responses for different document types
const MOCK_RESPONSES = {
  land_deed: {
    generateContent: (prompt: string) => {
      if (prompt.toLowerCase().includes('summarize') || prompt.toLowerCase().includes('bullet points')) {
        return `# Land Deed Analysis Summary

**Key Points:**
• Property located at 123 Main Street, Springfield, County of Franklin
• Grantor: John Smith and Mary Smith (husband and wife)
• Grantee: Robert Johnson and Susan Johnson (joint tenants)
• Property size: 2.5 acres with residential dwelling
• Transfer date: January 15, 2024
• Purchase price: $450,000
• All liens and encumbrances cleared at closing`;
      }
      
      if (prompt.toLowerCase().includes('key terms') || prompt.toLowerCase().includes('important terms')) {
        return `# Important Terms in Land Deed

**Legal Terms:**
• **Grantor**: The seller (John & Mary Smith)
• **Grantee**: The buyer (Robert & Susan Johnson)
• **Joint Tenancy**: Both buyers own equal shares with right of survivorship
• **Warranty Deed**: Seller guarantees clear title
• **Legal Description**: Metes and bounds survey description included
• **Easements**: Utility easement along eastern boundary
• **Covenants**: Standard warranties against liens and encumbrances`;
      }
      
      if (prompt.toLowerCase().includes('concerning') || prompt.toLowerCase().includes('risk')) {
        return `# Potential Areas of Concern

**Review Recommended:**
• Utility easement may restrict building on eastern 10 feet
• Property taxes will be prorated as of closing date
• Well water system - buyer responsible for testing
• Septic system last inspected in 2022
• Property boundaries should be verified by survey
• Homeowner's insurance required before closing`;
      }
      
      return `# Land Deed Document Analysis

This land deed represents the legal transfer of property ownership from John and Mary Smith to Robert and Susan Johnson. The document includes:

**Property Details:**
- Address: 123 Main Street, Springfield
- Size: 2.5 acres with existing residence
- Legal description with precise boundaries

**Financial Terms:**
- Purchase price: $450,000
- Property taxes prorated to closing date
- All closing costs allocated per agreement

**Legal Protections:**
- Warranty deed with full covenants
- Title insurance recommended
- Clear title guaranteed by grantor

The deed appears to be properly executed with notarization and required signatures.`;
    },
    
    analyzeDocument: () => `# Land Deed Analysis Complete

I've analyzed your **land deed document** for the property transfer.

## 📋 Document Summary

**Property Transfer Details:**
- **From:** John Smith and Mary Smith (Grantors)
- **To:** Robert Johnson and Susan Johnson (Grantees)
- **Property:** 123 Main Street, Springfield, Franklin County
- **Size:** 2.5 acres with residential dwelling
- **Sale Price:** $450,000
- **Transfer Date:** January 15, 2024

## 🏠 Property Information

**Legal Description:**
The property is described using metes and bounds surveying, providing precise boundaries and measurements.

**Key Features:**
- Existing single-family residence
- Well water system (buyer to test)
- Septic system (last inspected 2022)
- Utility easement along eastern boundary

## ⚖️ Legal Aspects

**Type of Deed:** Warranty Deed with full covenants
**Ownership Structure:** Joint tenancy with right of survivorship
**Title Status:** Clear title guaranteed by grantors

## ⚠️ Important Considerations

1. **Utility Easement:** Eastern 10 feet may have building restrictions
2. **Water/Septic:** Systems require buyer verification and testing
3. **Property Taxes:** Will be prorated as of closing date
4. **Insurance:** Homeowner's coverage required before closing
5. **Survey:** Boundary verification recommended

This appears to be a standard residential property transfer with proper legal documentation.`
  }
};

// Helper function to generate content with mock data
export async function generateContent(prompt: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Specific responses based on prompt content
  if (lowerPrompt.includes('main points') || lowerPrompt.includes('key points')) {
    return `# 📋 Main Points of Your Document

**Essential Information:**
• **Property Transfer:** John & Mary Smith → Robert & Susan Johnson
• **Location:** 123 Main Street, Springfield (2.5 acres)
• **Purchase Price:** $450,000 with clear title
• **Ownership Type:** Joint tenancy with survivorship rights
• **Transfer Date:** January 15, 2024
• **Property Features:** Residential home, well water, septic system

**Key Legal Elements:**
• Warranty deed with full covenants and protections
• Utility easement along eastern property boundary
• Property taxes prorated to closing date`;
  }
  
  if (lowerPrompt.includes('risks') || lowerPrompt.includes('red flags') || lowerPrompt.includes('watch out')) {
    return `# ⚠️ Potential Risks & Red Flags

**Areas of Concern:**
🚩 **Utility Easement:** Eastern 10 feet may restrict future building/modifications
🚩 **Well Water System:** Requires testing - quality and safety not guaranteed
🚩 **Septic System:** Last inspected 2022 - may need maintenance/replacement
🚩 **Property Boundaries:** Survey verification recommended before finalizing

**Financial Risks:**
💰 Property tax increases possible after reassessment
💰 Well/septic maintenance costs are buyer's responsibility
💰 Title insurance recommended but not explicitly required

**Action Items:**
✅ Get professional well water testing
✅ Inspect septic system thoroughly  
✅ Verify exact property boundaries
✅ Understand easement restrictions`;
  }
  
  if (lowerPrompt.includes('summarize') || lowerPrompt.includes('summary')) {
    return `# 📊 Document Summary

**What This Is:** A warranty deed transferring ownership of residential property

**Who's Involved:**
• **Sellers (Grantors):** John Smith & Mary Smith
• **Buyers (Grantees):** Robert Johnson & Susan Johnson

**The Property:**
• 2.5-acre residential property in Springfield
• Includes existing home, well, and septic system
• Clear legal title with warranty protections

**Financial Terms:**
• Sale price: $450,000
• Property taxes split based on closing date
• Standard closing cost allocations

**Bottom Line:** This appears to be a straightforward residential property sale with proper legal documentation and clear title transfer.`;
  }
  
  if (lowerPrompt.includes('pay attention') || lowerPrompt.includes('important') || lowerPrompt.includes('focus')) {
    return `# 🔍 What You Should Pay Attention To

**Critical Details:**
1. **Joint Tenancy Ownership:** Both buyers have equal rights + survivorship
2. **Utility Easement:** Eastern boundary has restrictions - check before building
3. **Water & Septic:** Private systems = ongoing maintenance responsibility
4. **Warranty Deed:** Sellers guarantee clear title (good protection for you)

**Before Closing:**
• Test well water quality and flow rate
• Inspect septic system functionality  
• Get current property survey
• Understand easement limitations
• Secure homeowner's insurance

**Financial Considerations:**
• Property taxes will be adjusted at closing
• Budget for potential well/septic repairs
• Consider title insurance for extra protection`;
  }
  
  if (lowerPrompt.includes('actionable') || lowerPrompt.includes('insights') || lowerPrompt.includes('next steps')) {
    return `# 💡 Actionable Insights & Next Steps

**Immediate Actions:**
1. **Schedule Well Testing** - Get water quality and flow analysis ($200-400)
2. **Septic Inspection** - Professional assessment recommended ($300-500)  
3. **Property Survey** - Verify boundaries and easement details ($500-800)
4. **Title Insurance** - Consider purchasing for extra protection

**Before Signing:**
✅ Review easement restrictions with local building department
✅ Get copies of previous septic inspection reports
✅ Understand your maintenance responsibilities for private utilities
✅ Confirm property tax amounts and payment schedule

**Long-term Planning:**
• Budget 1-2% of property value annually for maintenance
• Research local building codes for future improvements
• Establish relationships with well/septic service providers
• Keep all property documents in secure location

**Questions to Ask:**
• When was the well last tested?
• Are there any pending property tax appeals?
• What's included in the utility easement rights?`;
  }
  
  if (lowerPrompt.includes('questions') || lowerPrompt.includes('ask about')) {
    return `# ❓ Important Questions You Should Ask

**About the Property:**
• When was the well water last tested, and what were the results?
• What's the septic system capacity and condition?
• Are there any known boundary disputes or survey issues?
• What maintenance records exist for well and septic?

**About the Sale:**
• Are there any liens, judgments, or pending legal issues?
• What personal property is included in the sale?
• Who pays for title insurance and other closing costs?
• What happens if major issues are discovered before closing?

**About Restrictions:**
• What exactly can and cannot be done in the utility easement area?
• Are there HOA fees, deed restrictions, or building limitations?
• What are the local zoning requirements for future improvements?

**Financial Questions:**
• What were the property taxes last year, and are they current?
• Are utilities connected and functioning properly?
• What insurance requirements exist for the property?`;
  }
  
  if (lowerPrompt.includes('tell me more') || lowerPrompt.includes('explain more')) {
    return `# 🔍 More Detailed Information

**Legal Structure Explained:**
This warranty deed provides strong buyer protection. The sellers (grantors) legally guarantee they own the property free and clear, and they're responsible if any title problems arise later.

**Joint Tenancy Benefits:**
Both buyers own 100% of the property with "right of survivorship" - if one person dies, the other automatically inherits their share without going through probate court.

**Utility Easement Details:**
The eastern boundary easement gives utility companies permanent rights to access, maintain, and repair infrastructure. This typically means no buildings, fences, or major landscaping in that 10-foot strip.

**Private Utilities Implications:**
Well water and septic systems require ongoing maintenance and eventual replacement. Budget $1,000-3,000 annually for potential repairs, testing, and upkeep.

**Property Tax Considerations:**
Taxes are "prorated" meaning if closing happens mid-year, each party pays their proportional share. New owners should verify current tax rates and any pending reassessments.`;
  }
  
  if (lowerPrompt.includes('simpler terms') || lowerPrompt.includes('explain simply')) {
    return `# 📖 Explained in Simple Terms

**What's Happening:**
John and Mary Smith are selling their house and 2.5 acres to Robert and Susan Johnson for $450,000.

**The Good News:**
• Clean title (no legal problems with ownership)
• Warranty deed (sellers promise they really own it)
• Joint ownership (both buyers own it equally)

**Things to Know:**
• The house has its own well for water (not city water)
• It has its own septic system (not city sewer)
• There's a utility easement (power company can access part of the land)

**What This Means for Buyers:**
• You'll own the property together as equal partners
• You're responsible for maintaining the well and septic
• You can't build anything in the utility easement area
• If something goes wrong with the title, the sellers have to fix it

**Bottom Line:**
This looks like a normal house sale with good legal protection for the buyers, but you'll need to take care of your own water and sewer systems.`;
  }
  
  if (lowerPrompt.includes('rights') || lowerPrompt.includes('my rights')) {
    return `# ⚖️ Your Rights in This Transaction

**As Joint Tenants, You Have:**
• **Equal Ownership:** Both parties own 100% with survivorship rights
• **Right to Occupy:** Both can live on and use the entire property
• **Right to Transfer:** Either party can sell their interest (converts to tenancy in common)
• **Survivorship Rights:** If one owner dies, the other automatically inherits

**Warranty Deed Protections:**
• **Right to Clear Title:** Sellers guarantee no hidden ownership claims
• **Right to Quiet Enjoyment:** No one can legally challenge your ownership
• **Right to Legal Defense:** Sellers must defend against any title disputes
• **Right to Compensation:** If title problems arise, sellers are financially responsible

**Property Rights:**
• **Right to Improve:** Build, modify, or renovate (subject to local codes)
• **Right to Use Resources:** Well water and septic system access
• **Right to Exclude:** Keep others off your property (except easement areas)

**Before Closing Rights:**
• **Right to Inspect:** Professional inspections of all systems
• **Right to Review:** All property documents and disclosures
• **Right to Negotiate:** Terms, repairs, or price adjustments
• **Right to Walk Away:** If major problems are discovered`;
  }
  
  if (lowerPrompt.includes('costs') || lowerPrompt.includes('money') || lowerPrompt.includes('expenses')) {
    return `# 💰 Costs and Financial Considerations

**Purchase Costs:**
• **Sale Price:** $450,000
• **Closing Costs:** Typically 2-5% of purchase price ($9,000-22,500)
• **Title Insurance:** $1,000-2,000 (recommended)
• **Property Inspection:** $400-800
• **Well/Septic Testing:** $500-900

**Ongoing Costs:**
• **Property Taxes:** Varies by location (typically 1-3% annually)
• **Homeowner's Insurance:** $1,200-3,000/year for rural property
• **Well Maintenance:** $200-500/year for testing and upkeep
• **Septic Maintenance:** $300-600 every 3-5 years for pumping

**Potential Future Costs:**
• **Well Replacement:** $8,000-15,000 (lasts 15-30 years)
• **Septic Replacement:** $10,000-25,000 (lasts 20-40 years)
• **Property Improvements:** Subject to easement restrictions

**Money-Saving Tips:**
• Get multiple quotes for inspections
• Research local tax rates and exemptions
• Budget 1-2% of property value annually for maintenance
• Consider energy-efficient improvements for insurance discounts`;
  }
  
  if (lowerPrompt.includes('deadlines') || lowerPrompt.includes('timeline') || lowerPrompt.includes('important dates')) {
    return `# 📅 Important Deadlines and Timeline

**Critical Dates:**
• **Transfer Date:** January 15, 2024 (already completed)
• **Property Tax Proration:** Based on closing date
• **Insurance Requirement:** Must be in place before closing

**Typical Closing Timeline:**
• **Days 1-7:** Property inspections and well/septic testing
• **Days 8-14:** Review inspection results, negotiate repairs
• **Days 15-21:** Finalize mortgage approval and title search
• **Days 22-30:** Final walkthrough and closing preparation

**Ongoing Deadlines:**
• **Property Taxes:** Usually due quarterly or annually
• **Well Testing:** Recommended annually for safety
• **Septic Pumping:** Every 3-5 years depending on usage
• **Insurance Renewal:** Annual policy renewal required

**Important Reminders:**
• Schedule inspections immediately after contract signing
• Allow extra time for rural property title searches
• Plan for potential delays with well/septic testing
• Coordinate utility transfers and connections early

**Action Items:**
✅ Schedule all inspections within first week
✅ Order title insurance as soon as possible
✅ Contact insurance agent for policy quotes
✅ Research local property tax payment schedules`;
  }
  
  // Default response for other prompts
  return MOCK_RESPONSES.land_deed.generateContent(prompt);
}

// Function to analyze documents with mock data
export async function analyzeDocument(documentContent: string, question?: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  if (question) {
    return generateContent(question);
  }
  
  // Return mock analysis for land deed
  return MOCK_RESPONSES.land_deed.analyzeDocument();
}
